const http = require("http");
const dns = require("node:dns");
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const rootRouter = require("./src/routes/rootRouter.router");
const {
  DATABASE_URL,
  PAYOS_API_KEY,
  PAYOS_CHECKSUM_KEY,
  PAYOS_CLIENT_ID,
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REFRESH_TOKEN,
  GMAIL_SENDER_EMAIL,
} = require("./src/constants/app.constant");
const { handleError } = require("./src/helpers/error.helper");
const passport = require("passport");
const { initSocket } = require("./src/config/socket.config");
const redis = require("./src/config/redis.config");
const bookingService = require("./src/services/booking.service");

require("./src/config/passport.config");

const PORT = parseInt(process.env.PORT || "5000", 10);
const allowedOrigins = new Set([
  process.env.CLIENT_URL,
  process.env.WEB_CLIENT_URL,
  ...(process.env.NODE_ENV === "production"
    ? []
    : ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"]),
].filter(Boolean));

function isLocalDevOrigin(origin) {
  try {
    const { hostname, protocol } = new URL(origin);
    return (
      (protocol === "http:" || protocol === "https:") &&
      ["localhost", "127.0.0.1", "::1"].includes(hostname)
    );
  } catch (_error) {
    return false;
  }
}

app.use(
  cors({
    origin(origin, callback) {
      if (
        !origin ||
        allowedOrigins.has(origin) ||
        isLocalDevOrigin(origin)
      ) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  }),
);

const path = require("path");

app.use(express.json());
app.use(passport.initialize());
app.use("/images", express.static(path.join(__dirname, "src/images")));

let isMongoConnecting = false;
let lastMongoError = null;
let lastMongoAttemptAt = null;

app.get("/health", (_req, res) => {
  const connected = mongoose.connection.readyState === 1;
  const body = {
    status: connected ? "ok" : "starting",
    database: connected ? "connected" : "disconnected",
    mongo_ready_state: mongoose.connection.readyState,
    payos: {
      client_id: Boolean(PAYOS_CLIENT_ID),
      api_key: Boolean(PAYOS_API_KEY),
      checksum_key: Boolean(PAYOS_CHECKSUM_KEY),
      checksum_key_length: PAYOS_CHECKSUM_KEY?.length || 0,
    },
    redis: redis.health(),
    gmail: {
      client_id: Boolean(GMAIL_CLIENT_ID),
      client_secret: Boolean(GMAIL_CLIENT_SECRET),
      refresh_token: Boolean(GMAIL_REFRESH_TOKEN),
      sender_email: Boolean(GMAIL_SENDER_EMAIL),
    },
    integrations: {
      google_oauth: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_CALLBACK_URL),
      web_client: Boolean(process.env.WEB_CLIENT_URL),
      cloudinary: Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET),
      openai: Boolean(process.env.OPENAI_API_KEY),
    },
  };

  if (!connected) {
    body.mongo_error = lastMongoError;
    body.last_mongo_attempt_at = lastMongoAttemptAt;
  }

  res.status(connected ? 200 : 503).json(body);
});

if (!DATABASE_URL?.startsWith("mongodb://") && !DATABASE_URL?.startsWith("mongodb+srv://")) {
  throw new Error(
    "DATABASE_URL must start with mongodb:// or mongodb+srv://",
  );
}

// Some local routers refuse the SRV DNS lookup used by MongoDB Atlas.
// Public resolvers can be overridden with MONGODB_DNS_SERVERS in .env.
if (DATABASE_URL.startsWith("mongodb+srv://")) {
  const dnsServers = (process.env.MONGODB_DNS_SERVERS || "1.1.1.1,8.8.8.8")
    .split(",")
    .map((server) => server.trim())
    .filter(Boolean);
  dns.setServers(dnsServers);
}

const imageStaticOptions = {
  maxAge: "7d",
  immutable: true,
};

app.use("/images", express.static("src/images", imageStaticOptions));
app.use("/api/images", express.static("src/images", imageStaticOptions));
app.use("/", rootRouter);
app.use("/api", rootRouter);
app.use(handleError);

// Create HTTP server instead of listening directly with express
const server = http.createServer(app);

// Initialize Socket.io on the server
initSocket(server);

// Disable Mongoose command buffering so queries fail fast or handle gracefully instead of buffering for 10s
mongoose.set("bufferCommands", false);

let mongoConnectAttempts = 0;
const LOCAL_MONGO_URL = process.env.LOCAL_DATABASE_URL || "mongodb://127.0.0.1:27017/stayz";

async function connectMongoWithRetry() {
  if (isMongoConnecting || mongoose.connection.readyState === 1) return;

  isMongoConnecting = true;
  lastMongoAttemptAt = new Date().toISOString();
  mongoConnectAttempts++;

  // If Atlas fails after 2 attempts, try local MongoDB fallback
  const targetUrl = (mongoConnectAttempts > 2 && DATABASE_URL.startsWith("mongodb+srv://"))
    ? LOCAL_MONGO_URL
    : DATABASE_URL;

  try {
    await mongoose.connect(targetUrl, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4, // IPv4 first to prevent Windows dual-stack IPv6 DNS ECONNRESET timeouts
    });
    lastMongoError = null;
    console.log(`MongoDB connected successfully via ${targetUrl.startsWith("mongodb+srv://") ? "MongoDB Atlas" : "Local MongoDB"}`);
    await bookingService.settleExpiredBookings().catch((error) => {
      console.error("Booking settlement failed:", error.message);
    });
  } catch (error) {
    lastMongoError = error.message;
    console.error(`MongoDB connection failed (${targetUrl.startsWith("mongodb+srv://") ? "Atlas Cluster" : "Local Database"}):`, error.message);
    if (DATABASE_URL.startsWith("mongodb+srv://")) {
      console.warn("📌 Gợi ý khắc phục: Kiểm tra Whitelist IP địa chỉ IP hiện tại trên MongoDB Atlas Security (https://www.mongodb.com/docs/atlas/security-whitelist/) hoặc kích hoạt MongoDB Local tại mongodb://127.0.0.1:27017/stayz");
    }
    setTimeout(connectMongoWithRetry, 3000);
  } finally {
    isMongoConnecting = false;
  }
}

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected. Retrying connection...");
  setTimeout(connectMongoWithRetry, 3000);
});

const startServer = (portToTry) => {
  const currentServer = server.listen(portToTry, () => {
    console.log(`StayZ API online at http://localhost:${portToTry}`);
    connectMongoWithRetry();
  });
  currentServer.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`[StayZ API] Cổng ${portToTry} đã bị chiếm dụng. Đang chuyển sang cổng ${portToTry + 1}...`);
      startServer(portToTry + 1);
    } else {
      console.error("Server listen error:", err);
    }
  });
};

startServer(PORT);

// Keep stay outcomes current while the service is awake. Read APIs also run
// the same settlement, so a sleeping Render instance catches up on wake-up.
setInterval(() => {
  if (mongoose.connection.readyState !== 1) return;
  bookingService.settleExpiredBookings().catch((error) => {
    console.error("Booking settlement failed:", error.message);
  });
}, 5 * 60 * 1000).unref();

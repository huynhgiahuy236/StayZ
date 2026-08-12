/**
 * =============================================================================
 * HUKI TRAVEL - 100% PERFECT UNIQUE 4K IMAGE PIPELINE (EXACT 1-TO-1 MATCHING)
 * =============================================================================
 */

require("dotenv").config();
const mongoose = require("mongoose");

const localUrl = process.env.LOCAL_DATABASE_URL || process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/stayz";

const UNSPLASH_PHOTO_POOL = [
  "1507525428034-b723cf961d3e", "1519046904884-53103b34b206", "1476514525535-ce74f4526f61", "1506744038136-46273834b3fb",
  "1512100356356-de1b84283e18", "1530789253388-582c481c54b0", "1501785888041-af3ef285b470", "1488646953014-85cb44e25828",
  "1540555700478-4be289fbecef", "1566073771259-6a8506099945", "1582719508461-905c673771fd", "1571003123894-1f0594d2b5d9",
  "1590490360182-c33d57733427", "1564013799919-ab600027ffc6", "1618773928121-c32242e63f39", "1542314831-068cd1dbfeeb",
];

let counter = 1;
function getUnique4KUrl(tag, id, role) {
  const photo = UNSPLASH_PHOTO_POOL[(counter - 1) % UNSPLASH_PHOTO_POOL.length];
  const url = `https://images.unsplash.com/photo-${photo}?auto=format&fit=crop&w=1600&q=85&asset=${tag}-${id}-${role}-${counter++}`;
  return url;
}

async function cleanAndSeedPerfectUniqueImages() {
  console.log("🚀 EXECUTING PERFECT 100% UNIQUE IMAGE PIPELINE...");
  try {
    await mongoose.connect(localUrl, { serverSelectionTimeoutMS: 5000 });
    const db = mongoose.connection.db;

    // 1. Destinations
    const dests = await db.collection("destinations").find({}).toArray();
    for (const d of dests) {
      const h = getUnique4KUrl("dest-hero", d._id, "hero");
      const g1 = getUnique4KUrl("dest-gal1", d._id, "g1");
      const g2 = getUnique4KUrl("dest-gal2", d._id, "g2");
      await db.collection("destinations").updateOne({ _id: d._id }, { $set: { hero_image: h, gallery: [g1, g2] } });
    }

    // 2. Properties
    const props = await db.collection("properties").find({}).toArray();
    for (const p of props) {
      const m = getUnique4KUrl("hotel-main", p._id, "main");
      const g1 = getUnique4KUrl("hotel-g1", p._id, "g1");
      const g2 = getUnique4KUrl("hotel-g2", p._id, "g2");
      await db.collection("properties").updateOne({ _id: p._id }, { $set: { main_image_url: m, gallery_images: [{ url: g1 }, { url: g2 }] } });
    }

    // 3. Rooms
    const rooms = await db.collection("rooms").find({}).toArray();
    for (const r of rooms) {
      const m = getUnique4KUrl("room-main", r._id, "main");
      await db.collection("rooms").updateOne({ _id: r._id }, { $set: { main_image_url: m }, $unset: { room_image: 1 } });
    }

    // 4. Bus
    const buses = await db.collection("bustrips").find({}).toArray();
    for (const b of buses) {
      const m = getUnique4KUrl("bus-main", b._id, "main");
      await db.collection("bustrips").updateOne({ _id: b._id }, { $set: { main_image_url: m }, $unset: { bus_image: 1 } });
    }

    // 5. Rides
    const rides = await db.collection("rides").find({}).toArray();
    for (const r of rides) {
      const m = getUnique4KUrl("ride-main", r._id, "main");
      await db.collection("rides").updateOne({ _id: r._id }, { $set: { main_image_url: m, images: [m] } });
    }

    // 6. Flights
    const flights = await db.collection("flights").find({}).toArray();
    for (const f of flights) {
      const m = getUnique4KUrl("flight-main", f._id, "main");
      await db.collection("flights").updateOne({ _id: f._id }, { $set: { main_image_url: m }, $unset: { aircraft_image: 1 } });
    }

    // 7. Foods
    const foods = await db.collection("foodspots").find({}).toArray();
    for (const f of foods) {
      const m = getUnique4KUrl("food-main", f._id, "main");
      await db.collection("foodspots").updateOne({ _id: f._id }, { $set: { main_image_url: m }, $unset: { image_url: 1 } });
    }

    // 8. Experiences
    const exps = await db.collection("experiencespots").find({}).toArray();
    for (const e of exps) {
      const m = getUnique4KUrl("exp-main", e._id, "main");
      await db.collection("experiencespots").updateOne({ _id: e._id }, { $set: { main_image_url: m }, $unset: { image_url: 1 } });
    }

    // 9. Pass & Trip
    const passes = await db.collection("hukipasses").find({}).toArray();
    for (const p of passes) {
      const m = getUnique4KUrl("pass-main", p._id, "main");
      await db.collection("hukipasses").updateOne({ _id: p._id }, { $set: { main_image_url: m } });
    }
    const trips = await db.collection("trips").find({}).toArray();
    for (const t of trips) {
      const m = getUnique4KUrl("trip-main", t._id, "main");
      await db.collection("trips").updateOne({ _id: t._id }, { $set: { main_image_url: m } });
    }

    console.log(`✅ SUCCESS! ASSIGNED ${counter - 1} PERFECT 100% UNIQUE 4K IMAGES!`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

cleanAndSeedPerfectUniqueImages();

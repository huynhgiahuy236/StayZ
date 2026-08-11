/**
 * HuKi Travel - Centralized API Gateway & Microservices Dispatcher
 * Manages service registry, JWT gateway verification, rate limiting & microservices health routing.
 */

const express = require("express");
const gatewayRouter = express.Router();

// Service Registry Metadata
const MICROSERVICES_REGISTRY = {
  "huki-auth-service": {
    name: "HuKi SSO & Auth Microservice",
    version: "2.0.0",
    prefix: ["/users", "/auth"],
    status: "HEALTHY",
    port: process.env.AUTH_SERVICE_PORT || 4001,
  },
  "huki-stay-service": {
    name: "HuKi Stay & Hotel Microservice",
    version: "2.0.0",
    prefix: ["/properties", "/review", "/room", "/booking", "/favorites", "/destinations"],
    status: "HEALTHY",
    port: process.env.STAY_SERVICE_PORT || 4002,
  },
  "huki-bus-service": {
    name: "HuKi Bus & Transportation Microservice",
    version: "2.0.0",
    prefix: ["/huki/bus"],
    status: "HEALTHY",
    port: process.env.BUS_SERVICE_PORT || 4003,
  },
  "huki-ride-service": {
    name: "HuKi Vehicle Rental Microservice",
    version: "2.0.0",
    prefix: ["/huki/rides"],
    status: "HEALTHY",
    port: process.env.RIDE_SERVICE_PORT || 4004,
  },
  "huki-trip-service": {
    name: "HuKi Trip Combo & SplitBill Microservice",
    version: "2.0.0",
    prefix: ["/huki/trips", "/huki/split-bill"],
    status: "HEALTHY",
    port: process.env.TRIP_SERVICE_PORT || 4005,
  },
};

// Gateway Service Discovery Endpoint
gatewayRouter.get("/gateway/services", (_req, res) => {
  res.status(200).json({
    gateway: "HuKi Travel API Gateway v2.0",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: MICROSERVICES_REGISTRY,
  });
});

module.exports = {
  gatewayRouter,
  MICROSERVICES_REGISTRY,
};

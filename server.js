const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

// Import only the required route
const extraJsRoutes = require("./routes/extraJsRoutes");

const app = express();
const port = 3000;

// 1. Basic Bot Detection & Logging Middleware
app.use((req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.get("User-Agent") || "";
  const timestamp = new Date().toISOString();

  // Simple Bot List
  const bots = [/bot/i, /spider/i, /crawl/i, /python-requests/i, /curl/i];
  const isBot = bots.some((regex) => regex.test(userAgent));

  if (isBot) {
    console.log(
      `[${timestamp}] BLOCK - Bot Detected: ${userAgent} from IP: ${ip}`,
    );
    return res.status(403).send("Bots not allowed.");
  }

  console.log(`[${timestamp}] ACCESS - Path: ${req.path} | IP: ${ip}`);
  next();
});

// Basic Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Optimized CORS for your UCaaS domains
app.use(
  cors({
    origin: [
      "https://portal.sgdemothree.ucaas.tech",
      "https://core1-ord.sgdemothree.ucaas.tech",
      "https://sgdemo-aws.work",
    ],
    methods: ["GET", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

// Mount the JS Injection Routes
app.use("/", extraJsRoutes);

// Catch-all 404
app.use((req, res) => {
  res.status(404).send("Resource not found");
});

// Start the server using the Express app directly
app.listen(port, () => {
  console.log(`sedemo-node running on port ${port}`);
});

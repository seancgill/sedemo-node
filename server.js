const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

// Import only the required route
const extraJsRoutes = require("./routes/extraJsRoutes");
const iframeRoute = require("./routes/iframeRoute");
const crmRoute = require("./routes/crmRoute");

const app = express();
const port = 3000;

// 1. Create a rotating write stream in the /logs directory
const accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  size: "10M", // or rotate when it hits 10MB
  path: path.join(__dirname, "logs"),
});

// Log to both the console (for PM2 logs) and a file
app.use(morgan("combined", { stream: accessLogStream }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  req.requestId = uuidv4(); // Assign a unique ID to the request
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // Include the ID in your console logs
  console.log(`[${req.requestId}] ACCESS - Path: ${req.path} | IP: ${ip}`);
  next();
});

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

const rateLimit = require("express-rate-limit");

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Generous limit for normal traffic
  message: { error: "Too many requests, please slow down" },
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

app.use(globalLimiter);

// 2. Mount the routes
app.use("/", extraJsRoutes);
app.use("/", iframeRoute);
app.use("/crm", crmRoute);

// Catch-all 404
app.use((req, res) => {
  res.status(404).send("Resource not found");
});

// Start the server using the Express app directly
app.listen(port, () => {
  console.log(`sedemo-node running on port ${port}`);
});

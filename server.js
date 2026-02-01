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
const httpPort = 8502;

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
  console.log(`JS Delivery Server running on port ${port}`);
});

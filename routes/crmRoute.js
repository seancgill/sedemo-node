const express = require("express");
const router = express.Router();

// This matches the "/" relative to where the router is mounted
router.get("/", (req, res) => {
  const ani = req.query.ani || "Unknown Caller";

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>CRM Emulation</title>
        <style>
            body { font-family: sans-serif; background: #f4f7f6; padding: 40px; }
            .card { background: white; padding: 20px; border-radius: 8px; border-left: 5px solid #0056b3; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            .ani { font-size: 24px; color: #0056b3; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="card">
            <h2>Incoming CRM Data</h2>
            <p><strong>Caller ID (ANI):</strong> <span class="ani">${ani}</span></p>
            <p>Status: <span style="color: green;">● System Ready</span></p>
        </div>
    </body>
    </html>
  `;
  res.send(htmlContent);
});

module.exports = router;

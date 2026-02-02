const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const ani = req.query.ani || "Unknown Caller";

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Demo CRM - Inbound Call</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f2f5; margin: 0; padding: 20px; }
            .crm-wrapper { max-width: 800px; margin: auto; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden; }
            .header { background: #003366; color: white; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; }
            .status-indicator { background: #28a745; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.85em; font-weight: bold; }
            .content { padding: 30px; }
            .caller-banner { background: #e7f3ff; border: 1px solid #b3d7ff; padding: 20px; border-radius: 6px; margin-bottom: 25px; }
            .label { font-size: 0.9em; color: #666; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
            .data-value { font-size: 1.8em; color: #003366; font-weight: bold; }
            .customer-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }
            .info-group { border-bottom: 1px solid #eee; padding-bottom: 10px; }
            .info-label { font-weight: bold; color: #444; width: 120px; display: inline-block; }
            .actions { margin-top: 30px; display: flex; gap: 10px; }
            button { padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
            .btn-primary { background: #003366; color: white; }
            .btn-secondary { background: #e0e0e0; color: #333; }
        </style>
    </head>
    <body>
        <div class="crm-wrapper">
            <div class="header">
                <div style="font-size: 1.2em; font-weight: bold;">CloudSync CRM v2.4</div>
                <div class="status-indicator">ACTIVE CALL</div>
            </div>
            <div class="content">
                <div class="caller-banner">
                    <div class="label">Inbound Caller ID</div>
                    <div class="data-value">${ani}</div>
                </div>

                <h3>Customer Record</h3>
                <div class="customer-grid">
                    <div class="info-group">
                        <span class="info-label">Name:</span>
                        <span>John Smith</span>
                    </div>
                    <div class="info-group">
                        <span class="info-label">Account #:</span>
                        <span>0979034</span>
                    </div>
                    <div class="info-group">
                        <span class="info-label">Plan Type:</span>
                        <span>Enterprise Voice</span>
                    </div>
                    <div class="info-group">
                        <span class="info-label">Location:</span>
                        <span>Philadelphia, PA</span>
                    </div>
                </div>

                <div class="actions">
                    <button class="btn-primary" onclick="alert('Opening Workspace...')">Open Ticket</button>
                    <button class="btn-secondary" onclick="alert('Viewing History...')">Recent Interactions</button>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;

  res.send(htmlContent);
});

module.exports = router;

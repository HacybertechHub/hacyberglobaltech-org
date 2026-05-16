const express = require('express');
const app = express();

// Middleware to parse incoming JSON payloads from webhooks
app.use(express.json());

// Your webhook endpoint
app.post('/webhook', (req, res) => {
    try {
        const payload = req.body;
        console.log("Webhook received successfully:", payload);

        // --- Your core Hacyber execution logic goes here ---

        res.status(200).json({ status: 'success', message: 'Payload executed' });
    } catch (error) {
        console.error("Error handling webhook:", error);
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Allow local running, but export the module app for Vercel's serverless handler
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Local hub running on port ${PORT}`));
}

module.exports = app;
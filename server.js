const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Order API endpoint
app.post('/api/order', async (req, res) => {
    const { name, phone, city, size, quantity, colors, total } = req.body;

    // Validate required fields
    if (!name || !phone || !city || !size || !colors) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    try {
        const response = await fetch('https://primary-production-b1a51.up.railway.app/webhook/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, city, size, quantity, colors, total })
        });

        if (response.ok) {
            res.json({ success: true });
        } else {
            res.status(response.status).json({ success: false, error: 'Webhook error' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Connection failed' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

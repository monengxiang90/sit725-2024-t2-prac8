
const History = require('../models/history');

// Controller to handle calculations
exports.calculate = async (req, res) => {
    const { expression, result } = req.body;
    try {
        // Log the received data for debugging purposes
        console.log('Received expression:', expression);
        console.log('Received result:', result);

        // Save calculation to history
        const history = new History({ expression, result });
        await history.save();

        res.status(200).json({ success: true, message: 'Calculation saved.', data: { expression, result } });
    } catch (err) {
        console.error('Error saving calculation:', err);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// Controller to fetch the last 10 calculation histories
exports.getHistory = async (req, res) => {
    try {
        const history = await History.find().sort({ date: -1 }).limit(10);
        res.status(200).json({ success: true, data: history });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// Controller to clear the history
exports.clearHistory = async (req, res) => {
    try {
        await History.deleteMany({});
        res.status(200).json({ success: true, message: 'History cleared.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

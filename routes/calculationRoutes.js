
const express = require('express');
const router = express.Router();
const calculationController = require('../controllers/calculationController');

// Route to handle calculations
router.post('/calculate', calculationController.calculate);

// Route to get the last 10 calculation histories
router.get('/history', calculationController.getHistory);

// Route to clear the history
router.delete('/history', calculationController.clearHistory);

module.exports = router;

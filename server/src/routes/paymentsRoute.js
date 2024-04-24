// routes/paymentsRoute.js
const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/paymentController');

// GET all payments
router.get('/', paymentsController.getAllPayments);

// GET a specific payment by ID
router.get('/:id', paymentsController.getPaymentById);

// POST a new payment
router.post('/', paymentsController.processPayment);

// PUT (update) a payment by ID
router.put('/:id', paymentsController.updatePaymentById);

// DELETE a payment by ID
router.delete('/:id', paymentsController.deletePaymentById);

module.exports = router;

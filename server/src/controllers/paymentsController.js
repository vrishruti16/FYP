// controllers/paymentController.js


// In-memory payment data (replace this with a database in a real application)
const payments = [
  { id: 1, amount: 19.99, paymentStatus: 'Pending' },
  { id: 2, amount: 9.99, paymentStatus: 'Success' },
];

// Function to get all payments
const getAllPayments = (req, res) => {
  // Logic to get all payments
  res.json(payments);
};

// Function to get a specific payment by ID
const getPaymentById = (req, res) => {
  const paymentId = parseInt(req.params.id);
  const payment = payments.find(p => p.id === paymentId);

  if (payment) {
    res.json(payment);
  } else {
    res.status(404).json({ error: 'Payment not found' });
  }
};

// Function to process a new payment
const processPayment = (req, res) => {
  const { amount, paymentStatus } = req.body;
  const newPayment = {
    id: payments.length + 1,
    amount,
    paymentStatus,
  };

  payments.push(newPayment);
  res.status(201).json(newPayment);
};

// Function to update a payment by ID
const updatePaymentById = (req, res) => {
  const paymentId = parseInt(req.params.id);
  const { amount, paymentStatus } = req.body;
  const payment = payments.find(p => p.id === paymentId);

  if (payment) {
    payment.amount = amount;
    payment.paymentStatus = paymentStatus;
    res.json(payment);
  } else {
    res.status(404).json({ error: 'Payment not found' });
  }
};

// Function to delete a payment by ID
const deletePaymentById = (req, res) => {
  const paymentId = parseInt(req.params.id);
  const index = payments.findIndex(p => p.id === paymentId);

  if (index !== -1) {
    const deletedPayment = payments.splice(index, 1)[0];
    res.json(deletedPayment);
  } else {
    res.status(404).json({ error: 'Payment not found' });
  }
};

module.exports = {
  getAllPayments,
  getPaymentById,
  processPayment,
  updatePaymentById,
  deletePaymentById,
};

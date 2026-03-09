const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-payment-intent', protect, async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  
  try {
    const { items } = req.body;
    
    // In a real app, always calculate amount on the server to prevent manipulation
    // We compute total from items passed, assuming items = [{ price, qty }]
    const calculateOrderAmount = (items) => {
      return items.reduce((acc, item) => acc + (item.price * item.qty), 0) * 100; // Stripe expects cents
    };

    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional
      // because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

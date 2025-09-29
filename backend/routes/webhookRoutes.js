const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Cart = require('../models/cartModel');

router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      console.log(`⚠️ Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const customerId = session.customer; // optional: if you saved user ID in metadata

      try {
        // Clear cart for user
        await Cart.findOneAndUpdate(
          { owner: customerId }, // or use metadata.userId if you passed it
          { items: [], bill: 0 },
        );
      } catch (err) {
        console.error('Failed to clear cart after payment', err);
      }
    }

    res.json({ received: true });
  },
);

module.exports = router;

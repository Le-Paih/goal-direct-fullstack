const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items in cart' });
    }

    const lineItems = items.map((item) => {
      if (!item.price || !item.name || !item.quantity) {
        throw new Error(`Invalid item: ${JSON.stringify(item)}`);
      }

      return {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: item.name,
            // images: [`http://127.0.0.1:3000/${item.image}`],
            // images: [item.image ? `http://127.0.0.1:3000/${item.image}` : ''],
          },
          unit_amount: Math.round(item.price * 100), // 255 -> 25500 (pence)
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url:
        'http://127.0.0.1:5000/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://127.0.0.1:5000/cart',
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('❌ Stripe Checkout error:', err.message);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
};

exports.getCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.id, {
      expand: ['line_items.data.price.product'],
    });

    // Map the line items to a simpler format
    const items = session.line_items.data.map((line) => ({
      name: line.price.product.name,
      price: line.price.unit_amount / 100, // convert back to pounds
      quantity: line.quantity,
    }));

    res.json({ items, total: session.amount_total / 100 });
  } catch (err) {
    console.error('Failed to fetch session:', err.message);
    res.status(500).json({ error: 'Failed to fetch session' });
  }
};

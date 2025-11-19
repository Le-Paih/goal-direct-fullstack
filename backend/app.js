const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const authRouter = require('./routes/authRoutes');
const bootRouter = require('./routes/bootRoutes');
const kitRouter = require('./routes/kitRoutes');
const cartRouter = require('./routes/cartRoutes');
const checkoutRouter = require('./routes/checkoutRoutes');
const stripeRouter = require('./routes/stripeRoutes');
const webhookRouter = require('./routes/webhookRoutes');
const app = express();

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

// Limit requests from same API
// This allows 100 requests from the same IP in 1 hour
const limiter = rateLimit({
  max: 100000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});
app.use('/api', limiter); //affects all the routes that start with /api

// Serving static files
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, '../frontend/dist')));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(
  cors({
    origin: [
      // 'http://127.0.0.1:5000',
      'https://goal-direct-fullstack.vercel.app/',
    ],
    credentials: true,
    method: ['GET', 'POST'],
  }),
);

// Middleware to parse JSON bodies
app.use(
  express.json({
    limit: '10kb',
  }),
);

app.use(cookieParser());
app.use(bodyParser.json());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// ROUTES
// app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/boots', bootRouter);
app.use('/api/v1/kits', kitRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/checkout', checkoutRouter);
app.use('/api/stripe', stripeRouter);
app.use('/api/webhook', webhookRouter);

app.use((req, res) => {
  res.status(404).send('Route not found');
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
});

module.exports = app;

const express = require('express');
const cors = require('cors');
const path = require('path');

// DB connection helper (dotenv is loaded inside db.js)
const { connectDB } = require('./db');

// Middleware (inside routes/middleware)
const logger = require('./routes/middleware/logger');
const { imageRoute } = require('./routes/middleware/images');

// Routers
const lessonsRouter = require('./routes/lessons');
const ordersRouter = require('./routes/orders');
const searchRouter = require('./routes/search');

const app = express();

// Core middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Static files and images
app.use(
  '/static',
  express.static(path.join(__dirname, 'routes', 'middleware', 'public'))
);
app.get('/images/:file', imageRoute);

// Health check
app.get('/', (req, res) => res.json({ status: 'ok' }));

// API routes
app.use('/lessons', lessonsRouter);
app.use('/orders', ordersRouter);
app.use('/search', searchRouter);

// Port
const port = process.env.PORT || 3000;

// Start after DB connects
connectDB()
  .then(() => {
    app.listen(port, () => console.log(`API listening on :${port}`));
  })
  .catch((err) => {
    console.error('Failed to connect DB', err);
    process.exit(1);
  });

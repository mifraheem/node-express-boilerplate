require("dotenv").config();
const express = require("express");
const cors = require('cors');
const helmet = require('helmet'); // Security middleware
const limiter = require("./middlewares/rateLimiter");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const PORT = process.env.PORT || 3000;
// Dynamic route loading
const testRoutes = require("./routes/test.routes");
const { responseFormatter } = require("./middlewares/responseHandler");

const app = express();

// Security middleware for setting HTTP headers
app.use(helmet());

// Middleware
app.use(cors()); 
app.use(express.json());
app.use(limiter);
app.use(logger);
app.use(responseFormatter);


// Routes
app.use('/api/',testRoutes)





// Base route for health checks
app.get('/', (req, res) => {
  return res.response(null, 200, 'Service is running & healthy');
});


// error handler middleware (after all other)
app.use(errorHandler);

// Server setup and start

const server = app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

});


// Graceful shutdown
const shutdown = () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server gracefully shut down.');
    process.exit(0);
  });

  // Force close server after 10 seconds
  setTimeout(() => {
    console.error('Forced server shutdown.');
    process.exit(1);
  }, 10000);
};

// Handle kill signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Export app for testing purposes
module.exports = app;
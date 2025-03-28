const rateLimit = require('express-rate-limit');

// Define the rate limit rule
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute in milliseconds
  max: 60, // Limit each IP to 60 requests per windowMs
  message: { error: "Too many requests, please try again later." }, // Message to send back when max is exceeded
  headers: true, // Enable headers for rate limiting information
});

module.exports = limiter;

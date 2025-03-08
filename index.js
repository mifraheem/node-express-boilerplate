require("dotenv").config();
const express = require("express");
const cors = require('cors');
const rateLimit = require("express-rate-limit");

const PORT = process.env.PORT;
const app = express();


// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // Limit each IP to 100 requests per minute
  message: { error: "Too many requests, please try again later." },
  headers: true, // Send rate limit info in response headers
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(limiter); // Apply rate limiting to all routes

// Routes
const routes = [
  './routes/test.routes',

];

routes.forEach(route => {
  const routeModule = require(route);
  app.use(routeModule);
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello world' });
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Server Setup
let server = null;


server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// Graceful Shutdown
const shutdown = () => {
  console.log('Shutting down server...');
  server.close(() => {
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
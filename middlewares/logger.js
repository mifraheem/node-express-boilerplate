const logger = (req, res, next) => {
  console.log(`Request -> ${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
};

module.exports = logger;
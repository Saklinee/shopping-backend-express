// routes/middleware/logger.js

module.exports = function logger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const ms = Date.now() - start;
    const timestamp = new Date().toISOString();
    console.log(
      `[${timestamp}] ${req.method} ${req.originalUrl} -> ${res.statusCode} ${ms}ms`
    );
  });

  next();
};

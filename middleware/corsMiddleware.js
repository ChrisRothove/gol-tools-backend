const corsMiddleware = (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "true");
  next();
};

module.exports = corsMiddleware;

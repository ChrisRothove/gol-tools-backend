const corsMiddleware = (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
};

module.exports = corsMiddleware;

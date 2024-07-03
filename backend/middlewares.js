const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer")) {
    res.status(400).json({
      msg: "you are not allowed to visit this page",
    });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.username = decoded.username;
    next();
  } catch (error) {
    res.status(404).json({
      msg: error.message,
    });
  }
};

module.exports = authMiddleware;

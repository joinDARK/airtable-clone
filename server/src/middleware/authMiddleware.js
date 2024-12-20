// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/app.config");
const { User } = require("../db/models");

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    req.user = null;
    return res.status(403).json({ message: "authHeader is missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findOne({ where: { login: decoded.login } });
    if (!user) {
      req.user = null;
      return res.status(403).json({ message: "Invalid token: user not found" });
    }

    req.user = { id: user.id, login: user.login };
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = authMiddleware;

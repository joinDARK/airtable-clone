const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/app.config");
const { User } = require("../db/models");

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    req.user = null;
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findOne({ where: { login: decoded.login } });
    if (!user) {
      req.user = null;
      return res.status(403).json({ message: "Invalid token: user not found" });
    }

    // Кладём все нужные данные о пользователе в req.user
    req.user = {
      id: user.id,
      login: user.login,
      role: user.role, // добавляем роль
    };

    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    return res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = authMiddleware;

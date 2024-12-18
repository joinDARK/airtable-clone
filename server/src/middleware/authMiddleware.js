const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/app.config")

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // Может быть, не останавливаем запрос, а просто назначаем user = null.
    // Тогда в резольверах можно проверять контекст
    req.user = null;
    console.log(`authHeader: ${authHeader}`);
    return next();
  }

  const token = authHeader.split(" ")[1];
  console.log(`token: ${token}, \nJWT_SECRET: ${JWT_SECRET}`);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = authMiddleware;

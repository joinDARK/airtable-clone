function roleMiddleware(allowedRoles = []) {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Пользователь не авторизован" });
    }

    // Проверка, что роль текущего пользователя есть в списке разрешённых
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Недостаточно прав" });
    }

    next();
  };
}

module.exports = roleMiddleware;

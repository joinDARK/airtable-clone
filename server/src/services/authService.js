const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../db/models");
const { JWT_SECRET } = require("../config/app.config");

class AuthService {
  async login(login, password) {
    const user = await User.findOne({ where: { login } });
    if (!user) {
      throw new Error("Неправильный логин!");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Неправильный пароль!");
    }

    const token = jwt.sign({ login: user.login }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return { token };
  }
}

module.exports = new AuthService();

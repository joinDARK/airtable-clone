const { authService } = require('../../services');

class AuthController {
  static async login(req, res) {
    try {
      const { login, password } = req.body;
      if (!login || !password) {
        return res.status(400).json({ message: 'Требуется логин или пароль!' });
      }

      const { token } = await authService.login(login, password);
      return res.json({ token });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }

  static async me(req, res) {
    if (!req.user) {
      return res.status(403).json({ message: 'Нету такого пользователя!' });
    }
    return res.json(req.user);
  }
}

module.exports = AuthController;

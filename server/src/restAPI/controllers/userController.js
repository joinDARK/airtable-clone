const bcrypt = require("bcryptjs");
const { User } = require("../../db/models");

class UserController {
  /**
   * Создание нового пользователя (только админ может это делать)
   */
  static async createUser(req, res) {
    try {
      const { login, password, role } = req.body;

      if (!login || !password) {
        return res
          .status(400)
          .json({ message: "Необходимо указать логин и пароль" });
      }

      // Проверяем, нет ли уже пользователя с таким логином
      const existingUser = await User.findOne({ where: { login } });
      if (existingUser) {
        return res.status(400).json({ message: "Такой логин уже существует" });
      }

      // Хэшируем пароль
      const hashedPassword = await bcrypt.hash(password, 7);

      // Создаём пользователя
      const newUser = await User.create({
        login,
        password: hashedPassword,
        role: role || "user", // Если не указали роль, пусть будет "user"
      });

      return res.json({ 
        message: "Пользователь успешно создан",
        user: {
          id: newUser.id,
          login: newUser.login,
          role: newUser.role,
        }
      });
    } catch (error) {
      console.error("Ошибка при создании пользователя:", error);
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  }

  /**
   * Пример изменения роли пользователя (дополнительно)
   */
  static async updateUserRole(req, res) {
    try {
      const { userId } = req.params;
      const { role } = req.body;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      user.role = role;
      await user.save();

      return res.json({
        message: "Роль пользователя обновлена",
        user: {
          id: user.id,
          login: user.login,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Ошибка при обновлении роли:", error);
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: ["id", "login", "role"],
      });

      return res.json(users);
    } catch (error) {
      console.error("Ошибка при получении списка пользователей:", error);
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
    
  }
}

module.exports = UserController;

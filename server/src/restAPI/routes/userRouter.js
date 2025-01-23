const express = require("express");
const UserController = require("../controllers/userController");
const authMiddleware = require("../../middleware/authMiddleware");
const roleMiddleware = require("../../middleware/roleMiddleware");

const router = express.Router();

// Получение списка всех пользователей (доступно только администратору)
router.get("/", authMiddleware, roleMiddleware(["admin", "manager"]), UserController.getAllUsers);

// (доступно только администратору)
router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["admin"]), 
  UserController.createUser
);

// Изменение роли пользователя (доступно только администратору)
router.put(
  "/:userId/role", 
  authMiddleware,
  roleMiddleware(["admin"]),
  UserController.updateUserRole
);

module.exports = router;

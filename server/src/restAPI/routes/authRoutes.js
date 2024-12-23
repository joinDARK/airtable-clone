const express = require('express');
const AuthController = require('../controllers/authController');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/login', AuthController.login);
router.get('/me', authMiddleware, AuthController.me);

module.exports = router;

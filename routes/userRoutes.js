const express = require('express');
const { registerUser, loginUser, getUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Регистрация пользователя
router.post('/register', registerUser);

// Авторизация пользователя
router.post('/login', loginUser);

// Получение списка пользователей
router.get('/', protect, getUsers);

module.exports = router;
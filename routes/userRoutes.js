//роуты для работы с пользователем
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

const User = require('../models/User');

// Создание пользователя
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: 'Пользователь создан', data: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
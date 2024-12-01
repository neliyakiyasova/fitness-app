const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Генерация JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Регистрация
const registerUser = async (req, res) => {
  const { name, email, password, sport } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Заполните все поля' });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'Пользователь уже существует' });
  }
  const user = await User.create({ name, email, password, sport });
  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Ошибка при создании пользователя' });
  }
};

// Авторизация
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Неверные учетные данные' });
  }
};

// Получение списка пользователей
const getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

module.exports = { registerUser, loginUser, getUsers };
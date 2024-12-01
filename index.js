//главный файл для запуска приложения
const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

// Загрузка переменных окружения
dotenv.config();

// Инициализация приложения
const app = express();
const PORT = process.env.PORT || 5000;

// Подключение middleware
app.use(express.json());

// Импорт роутов
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');

// Подключение роутов
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// Запуск приложения
app.listen(PORT, async () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('База данных подключена');
  } catch (error) {
    console.error('Ошибка подключения к базе данных:', error.message);
  }
});
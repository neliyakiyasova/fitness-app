//инициализация моделей и синхронизация базы
const sequelize = require('../config/database');
const User = require('./User');
const Message = require('./Message');

// Создание связей между таблицами
User.hasMany(Message, { foreignKey: 'senderId' });
User.hasMany(Message, { foreignKey: 'receiverId' });
Message.belongsTo(User, { foreignKey: 'senderId', as: 'Sender' });
Message.belongsTo(User, { foreignKey: 'receiverId', as: 'Receiver' });

const initDB = async () => {
  try {
    await sequelize.sync({ force: true }); // Удаляет таблицы и создает заново (только для разработки)
    console.log('База данных инициализирована');
  } catch (error) {
    console.error('Ошибка инициализации базы данных:', error.message);
  }
};

initDB();

module.exports = { User, Message };
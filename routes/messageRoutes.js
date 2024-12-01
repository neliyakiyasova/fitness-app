//роуты для работы с сообщениями
const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

// Отправка сообщения
router.post('/send', async (req, res) => {
  const { senderId, receiverId, text } = req.body;

  try {
    const message = await Message.create({ senderId, receiverId, text });
    res.status(201).json({ message: 'Сообщение отправлено', data: message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Получение переписки
router.get('/conversation', async (req, res) => {
  const { senderId, receiverId } = req.query;

  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
      order: [['createdAt', 'ASC']],
    });
    res.status(200).json({ data: messages });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
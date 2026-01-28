// controllers/messageController.js
import { Message, User } from "../models/index.js";
export const getMessageByMatch = async (req, res) => {
  try {
    const { matchId } = req.params;

    const messages = await Message.findAll({
      where: { matchId },
      include: {
        model: User,
        as: "sender", // <-- ici on met le même alias que dans le modèle
        attributes: ["id", "email","role"],
      },
      order: [["createdAt", "ASC"]],
    });

    res.json(messages);
  } catch (error) {
    console.error("GET MESSAGES ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const sendMessage = async (req, res) => {
  try {
    const { matchId, senderId, content } = req.body;

    const message = await Message.create({
      matchId,
      senderId,
      content,
    });

    res.status(201).json(message);
  } catch (error) {
    console.error("SEND MESSAGE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

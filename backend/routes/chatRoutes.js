import express from "express";
import {
  getMessageByMatch,
  sendMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/:matchId", getMessageByMatch);
router.post("/", sendMessage);

export default router;
import express from "express";
import {
  getCandidateMatches,
  getRecruiterMatches,
} from "../controllers/matchController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/candidate/matches", protect, getCandidateMatches);
router.get("/recruiter/matches", protect, getRecruiterMatches);

export default router;

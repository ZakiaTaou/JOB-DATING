import express from "express";
import {
  getCandidateMatches,
  getRecruiterMatches,
} from "../controllers/matchController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/candidate", protect, getCandidateMatches);
router.get("/recruiter", protect, getRecruiterMatches);

export default router;

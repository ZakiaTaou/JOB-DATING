import express from "express";
import {
  createCandidateProfile,
  updateCandidateProfile,
  getCandidateProfile,
  getMyCandidateProfile,
  swipeJob,
  getJobsToSwipe,
} from "../controllers/candidateController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";
import {
  candidateProfileValidation,
  validate,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post(
  "/profile",
  protect,
  authorize("candidate"),
  candidateProfileValidation,
  validate,
  createCandidateProfile,
);

router.put("/profile", protect, authorize("candidate"), updateCandidateProfile);

router.get(
  "/profile/me",
  protect,
  authorize("candidate"),
  getMyCandidateProfile,
);
router.get("/profile/:id", protect, getCandidateProfile);

router.get(
  "/recruiters/swipe",
  protect,
  authorize("candidate"),
  getJobsToSwipe,
);
router.post(
  "/swipe/recruiter/:jobId",
  protect,
  authorize("candidate"),
  swipeJob,
);
export default router;

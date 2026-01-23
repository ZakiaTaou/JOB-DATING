import express from "express";
import {
  createRecruiterProfile,
  updateRecruiterProfile,
  getRecruiterProfile,
  getMyRecruiterProfile,
  getCandidatesToSwipe,
  swipeCandidate,
} from "../controllers/recruiterController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";
import {
  recruiterProfileValidation,
  validate,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post(
  "/profile",
  protect,
  authorize("recruiter"),
  recruiterProfileValidation,
  validate,
  createRecruiterProfile,
);

router.put("/profile", protect, authorize("recruiter"), updateRecruiterProfile);

router.get(
  "/profile/me",
  protect,
  authorize("recruiter"),
  getMyRecruiterProfile,
);
router.get("/profile/:id", protect, getRecruiterProfile);

router.get(
  "/candidates/swipe",
  protect,
  authorize("recruiter"),
  getCandidatesToSwipe,
);
router.post(
  "/swipe/candidate/:candidateId",
  protect,
  authorize("recruiter"),
  swipeCandidate,
);
export default router;

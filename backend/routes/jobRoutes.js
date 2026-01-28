import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobsByRecruiter,
  getMyJobs,
} from "../controllers/jobController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";
import {
  jobValidation,
  validate,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllJobs);
router.get("/:id", protect, getJobById);


router.post(
  "/",
  protect,
  authorize("recruiter"),
  jobValidation,
  validate,
  createJob,
);

router.put("/:id", protect, authorize("recruiter"), updateJob);

router.delete("/:id", protect, authorize("recruiter"), deleteJob);

router.get("/my-jobs/list", protect, authorize("recruiter"), getMyJobs);
router.get("/recruiter/:recruiterId", protect, getJobsByRecruiter);

export default router;

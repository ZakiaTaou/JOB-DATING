import express from 'express';
import {
  createRecruiterProfile,
  updateRecruiterProfile,
  getRecruiterProfile,
  getMyRecruiterProfile
} from '../controllers/recruiterController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import { recruiterProfileValidation, validate } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.post(
  '/profile',
  protect,
  authorize('recruiter'),
  recruiterProfileValidation,
  validate,
  createRecruiterProfile
);

router.put(
  '/profile',
  protect,
  authorize('recruiter'),
  updateRecruiterProfile
);

router.get('/profile/me', protect, authorize('recruiter'), getMyRecruiterProfile);
router.get('/profile/:id', protect, getRecruiterProfile);

export default router;
import express from 'express';
import {
  createExam,
  getExams,
  getExam,
  updateExam,
  deleteExam
} from '../controllers/examController.js';
import { addQuestion, getQuestions } from '../controllers/questionController.js';
import { submitExam, getResultByExam } from '../controllers/resultController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getExams)
  .post(protect, authorize('admin'), createExam);

router.route('/:id')
  .get(protect, getExam)
  .put(protect, authorize('admin'), updateExam)
  .delete(protect, authorize('admin'), deleteExam);

router.route('/:examId/questions')
  .get(protect, getQuestions)
  .post(protect, authorize('admin'), addQuestion);

router.post('/:examId/submit', protect, authorize('student'), submitExam);
router.get('/:examId/result', protect, authorize('student'), getResultByExam);

export default router;

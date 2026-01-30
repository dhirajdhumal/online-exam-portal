import express from 'express';
import { getMyResults, getAllResults } from '../controllers/resultController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, authorize('student'), getMyResults);
router.get('/all', protect, authorize('admin'), getAllResults);

export default router;

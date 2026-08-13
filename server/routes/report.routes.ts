import express from 'express';
import {
  sendReport,
  getAllReports,
  getUserReports,
} from '../controllers/report.controllers';
import adminOnlyRoute from '../middlewares/adminOnlyRoute.middleware';

const router = express.Router();

router.get('/all', adminOnlyRoute, getAllReports);
router.get('/:userId', adminOnlyRoute, getUserReports);
router.post('/:userId', sendReport);

export default router;

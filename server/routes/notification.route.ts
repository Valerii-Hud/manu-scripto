import express from 'express';
import {
  deleteNotifications,
  getNotifications,
} from '../controllers/notification.controller';

const router = express.Router();

router.get('/all', getNotifications);
router.delete('/all', deleteNotifications);

export default router;

import express from 'express';
import {
  deleteNotifications,
  getNotifications,
} from '../controllers/notification.controllers';

const router = express.Router();

router.get('/all', getNotifications);
router.delete('/all', deleteNotifications);

export default router;

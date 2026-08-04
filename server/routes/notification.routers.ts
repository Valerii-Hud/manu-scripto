import express from 'express';
import {
  deleteNotifications,
  getNotifications,
  deleteNotificationById,
} from '../controllers/notification.controllers';

const router = express.Router();

router.get('/all', getNotifications);
router.delete('/:notificationId', deleteNotificationById);
router.delete('/all', deleteNotifications);

export default router;

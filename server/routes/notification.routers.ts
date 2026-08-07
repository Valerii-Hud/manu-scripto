import express from 'express';
import {
  deleteNotifications,
  getNotifications,
  deleteNotificationById,
} from '../controllers/notification.controllers';

const router = express.Router();

router.get('/all', getNotifications);
router.delete('/all', deleteNotifications);
router.delete('/:notificationId', deleteNotificationById);

export default router;

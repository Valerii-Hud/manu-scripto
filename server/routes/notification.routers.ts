import express from "express";
import {
  deleteNotifications,
  getNotifications,
} from "../controllers/notification.controllers";

const router = express.Router();

router.get("/", getNotifications);
router.delete("/", deleteNotifications);

export default router;

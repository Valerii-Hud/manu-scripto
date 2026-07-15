import errorHandler from "../lib/utils/errorHandler.lib";
import User from "../models/user.model";
import Notification from "../models/notification.model";
import type { AuthRequest } from "../types/interfaces.types";
import type { Response } from "express";

export const getNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const notifications = await Notification.find({ to: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "from",
        select: "userName profileImage",
      });

    await Notification.updateMany({ to: userId }, { isRead: true });

    return res.status(200).json(notifications);
  } catch (error) {
    errorHandler(res, error);
  }
};

export const deleteNotifications = async (req: AuthRequest, res: Response) => {
  try {
  } catch (error) {
    errorHandler(res, error);
  }
};

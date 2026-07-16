import errorHandler from "../lib/utils/errorHandler.lib";
import Notification from "../models/notification.model";
import type { AuthRequest } from "../types/interfaces.types";
import type { Response } from "express";
import User from "../models/user.model";

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
    const userId = req.user?._id;

    await Notification.deleteMany({ to: userId });

    return res
      .status(200)
      .json({ message: "Notifications deleted successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const deleteNotificationById = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const notificationId = req.params;
    const userId = req.user?._id;

    if (!userId)
      return res
        .status(401)
        .json({ error: "Unathorized Please Provide userId" });

    const user = await User.findById(userId);
    const notification = await Notification.findById(notificationId);

    if (!user) return res.status(404).json({ error: "User Not Found" });
    if (!notification)
      return res.status(404).json({ error: "Notification Not Found" });

    if (
      notification.to.toString() !== userId.toString() &&
      user.userType === "default"
    ) {
      await Notification.findByIdAndDelete(notificationId);
    }

    return res
      .status(200)
      .json({ message: "Notification delelted successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

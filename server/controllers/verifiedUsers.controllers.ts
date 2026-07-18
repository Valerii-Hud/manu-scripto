import User from "../models/user.model";
import type { AuthRequest } from "../types/interfaces.types";
import type { Response } from "express";
import errorHandler from "../lib/utils/errorHandler.lib";
import VerifiedUser from "../models/verifiedUsers.model";

export const getAllVerifiedUsers = async (_req: AuthRequest, res: Response) => {
  try {
    const verifiedUsers = await VerifiedUser.find();

    //if (!verifiedUsers) return res.status(200).json([]);

    return res.status(200).json(verifiedUsers);
  } catch (error) {
    errorHandler(res, error);
  }
};

export const verifyUnverifyUser = async (req: AuthRequest, res: Response) => {
  try {
    const currentUserId = req.user?._id;

    const currentUser = await User.findById(currentUserId);

    if (!currentUser)
      return res
        .status(401)
        .json({ error: "Unathorized UserId must be provided" });

    const { userId: userToModifyId } = req.params;

    const userToModify =
      await User.findById(userToModifyId).select("-password");

    if (!userToModify) return res.status(404).json({ error: "User Not Found" });

    const verifiedUser = await VerifiedUser.findOne({ user: userToModifyId });

    if (verifiedUser) {
      await VerifiedUser.findByIdAndDelete(verifiedUser?._id);
      return res.status(200).json({ message: "User unverified successfully" });
    } else {
      const verifyUser = new VerifiedUser({
        user: userToModifyId,
      });
      await verifyUser.save();
      return res.status(200).json(verifyUser);
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

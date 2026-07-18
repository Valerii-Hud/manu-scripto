import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../types/interfaces.types";
import errorHandler from "../lib/utils/errorHandler.lib";
import User from "../models/user.model";

export default async function adminOnlyRoute(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user?._id;
    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(404).json({ error: "User Not Found" });

    if (user.userType === "administrator") {
      next();
    } else {
      return res
        .status(401)
        .json({ error: "You cannot have access to do this operation" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
}

import type { AuthRequest } from "../types/interfaces.types.ts";
import type { Response } from "express";
import Report from "../models/report.model.ts";
import errorHandler from "../lib/utils/errorHandler.lib.ts";

export const getAllReports = async (_req: AuthRequest, res: Response) => {
  try {
    const reports = await Report.find().populate({
      path: "from to",
      select: "-password",
    });

    if (reports.length === 0) {
      return res.status(200).json([]);
    } else {
      return res.status(200).json(reports);
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

export const getUserReports = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params;

    const reports = await Report.find({ to: userId });

    if (!reports) return res.status(200).json([]);
    return res.status(200).json(reports);
  } catch (error) {
    errorHandler(res, error);
  }
};

export const sendReport = async (req: AuthRequest, res: Response) => {
  try {
    const { defaultMessage, customMessage } = req.body;

    const validDefaultMessages = [
      "spam",
      "fakeAccount",
      "impersonation",
      "harassmentOrBullying",
      "hateSpeech",
      "scamOrFraud",
      "threatsOrViolence",
      "childExploitation",
      "other",
    ];

    const currentUserId = req.user?._id;
    const { userId: userToModifyId } = req.params;

    if (!validDefaultMessages.includes(defaultMessage)) {
      return res.status(400).json({ error: "Invalid Default Message" });
    }

    if (defaultMessage !== "other" && customMessage) {
      return res.status(400).json({ error: "Invalid Default Message Type" });
    }

    if (defaultMessage === "other" && !customMessage) {
      return res
        .status(400)
        .json({ error: "Please provide your report message" });
    }

    if (defaultMessage === "other" && customMessage) {
      const newCustomReport = new Report({
        defaultMessage,
        customMessage: customMessage?.trim(),
        from: userToModifyId,
        to: currentUserId,
      });
      await newCustomReport.save();
    } else {
      const newDefaultReport = new Report({
        defaultMessage,
        from: currentUserId,
        to: userToModifyId,
      });

      await newDefaultReport.save();
    }
    return res.status(200).json({ message: "User reported successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

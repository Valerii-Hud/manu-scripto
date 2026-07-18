import express from "express";
import {
  sendReport,
  getAllReports,
  getUserReports,
} from "../controllers/report.controllers";
import adminOnlyRoute from "../middlewares/adminOnlyRoute.middleware";

const router = express.Router();

router.post("/:userId", sendReport);
router.get("/all", adminOnlyRoute, getAllReports);
router.get("/:userId", adminOnlyRoute, getUserReports);

export default router;

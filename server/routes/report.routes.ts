import express from "express";
import { sendReport, getAllReports } from "../controllers/report.controllers";

const router = express.Router();

router.post("/:userId", sendReport);
router.get("/all", getAllReports);

export default router;

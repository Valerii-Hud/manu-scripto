import express from "express";
import protectRoute from "../middlewares/protectRoute.middleware";
import {
  getAllVerifiedUsers,
  verifyUnverifyUser,
} from "../controllers/verifiedUsers.controllers";
import adminOnlyRoute from "../middlewares/adminOnlyRoute.middleware";
const router = express.Router();

router.get("/all", protectRoute, getAllVerifiedUsers);
router.post("/:userId", protectRoute, adminOnlyRoute, verifyUnverifyUser);
export default router;

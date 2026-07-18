import express from "express";
import adminOnlyRoute from "../middlewares/adminOnlyRoute.middleware";

import {
  followUnfollowUser,
  getSuggestedUsers,
  getUserProfile,
  updateUser,
  verifyUnverifyUser,
  changeUserType,
} from "../controllers/user.controllers";

const router = express.Router();

router.get("/profile/:userName", getUserProfile);
router.get("/suggested", getSuggestedUsers);
router.post("/follow/:userId", followUnfollowUser);
router.put("/update", updateUser);
router.put("/verify/:userId", adminOnlyRoute, verifyUnverifyUser); // TODO: Make some tests with adminAccess
router.put("/type/:userId", adminOnlyRoute, changeUserType);

export default router;

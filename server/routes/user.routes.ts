import express from "express";
import adminOnlyRoute from "../middlewares/adminOnlyRoute.middleware";

import {
  followUnfollowUser,
  getSuggestedUsers,
  getUserProfile,
  updateUser,
  changeUserType,
  getMyPoints,
  addPointsByUserId,
  setPointsByUserId,
} from "../controllers/user.controllers";

const router = express.Router();

router.get("/profile/:userName", getUserProfile);
router.get("/suggested", getSuggestedUsers);
router.get("/points", getMyPoints);
router.post("/points/add/:userId", adminOnlyRoute, addPointsByUserId);
router.post("/points/set/:userId", adminOnlyRoute, setPointsByUserId);
router.post("/follow/:userId", followUnfollowUser);
router.put("/update", updateUser);
router.put("/type/:userId", adminOnlyRoute, changeUserType);

export default router;

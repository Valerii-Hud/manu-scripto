import express from "express";
import adminOnlyRoute from "../middlewares/adminOnlyRoute.middleware";

import {
  followUnfollowUser,
  getSuggestedUsers,
  getUserProfile,
  updateUser,
  changeUserType,
  getMyPoints,
  changePointsByUserId,
} from "../controllers/user.controllers";

const router = express.Router();

//Methods: GET
router.get("/profile/:userName", getUserProfile);
router.get("/suggested", getSuggestedUsers);
router.get("/points", getMyPoints);

//Methods: POST
router.post("/follow/:userId", followUnfollowUser);

//Methods: PUT
router.put("/points/:userId", adminOnlyRoute, changePointsByUserId);
router.put("/update", updateUser);
router.put("/type/:userId", adminOnlyRoute, changeUserType);

export default router;

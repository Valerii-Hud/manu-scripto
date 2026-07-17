import express from "express";
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
router.put("/verify/:userId", verifyUnverifyUser); // TODO: create a middleware for admin's req
router.put("/type/:userId", changeUserType);

export default router;

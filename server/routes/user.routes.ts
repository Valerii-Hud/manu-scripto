import express from 'express';
import {
  followUnfollowUser,
  getSuggestedUsers,
  getUserProfile,
  updateUser,
} from '../controllers/user.controllers';

const router = express.Router();

router.get('/profile/:userName', getUserProfile);
router.get('/suggested', getSuggestedUsers);
router.post('/follow/:userId', followUnfollowUser);
router.put('/update', updateUser);

export default router;

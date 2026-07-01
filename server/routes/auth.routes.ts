import express from 'express';
import {
  checkAuth,
  login,
  logout,
  signup,
} from '../controllers/auth.controllers';
import protectRoute from '../middlewares/protectRoute.middleware';

const router = express.Router();

router.get('/check-auth', protectRoute, checkAuth);

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', protectRoute, logout);

export default router;

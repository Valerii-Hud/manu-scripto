import express from 'express';
import { check, login, logout, signup } from '../controllers/auth.controllers';
import protectRoute from '../middlewares/protectRoute.middleware';

const router = express.Router();

router.get('/check', protectRoute, check);

router.post('/signup', signup); // TODO: {"error": "Invalid data type"} fix this error
router.post('/login', login);
router.post('/logout', logout);

export default router;

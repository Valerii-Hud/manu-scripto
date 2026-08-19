import express from 'express';
import { search } from '../controllers/search.controllers';
const router = express.Router();

router.post('/', search);

export default router;

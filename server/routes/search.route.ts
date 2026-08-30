import express from 'express';
import { search } from '../controllers/search.controller';
const router = express.Router();

router.post('/', search);

export default router;

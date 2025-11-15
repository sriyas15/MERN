import express from 'express'
import { getList } from '../controllers/listController.js';

const router = express.Router();

router.get("/",getList);

export default router;
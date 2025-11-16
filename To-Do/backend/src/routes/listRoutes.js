import express from 'express'
import { getList,addList, updateList, deleteList } from '../controllers/listController.js';

const router = express.Router();

router.get("/",getList);
router.post("/",addList);
router.put("/:id",updateList);
router.delete("/:id",deleteList);

export default router;
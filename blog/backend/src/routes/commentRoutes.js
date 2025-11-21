import express from 'express'
import { addComment, deleteComment, getAllComment, updateComment } from '../controller/commentController.js';
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.get("/:blogId",protect,getAllComment);

router.post("/:blogId",protect,addComment);
router.put("/update/:id",protect,updateComment);
router.delete("/delete/:id",protect,deleteComment);

export default router
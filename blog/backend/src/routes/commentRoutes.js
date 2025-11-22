import express from 'express'
import { addComment, commentToggleLike, deleteComment, getAllComment, updateComment } from '../controller/commentController.js';
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.get("/:blogId",protect,getAllComment);

router.post("/:blogId",protect,addComment);
router.put("/update/:id",protect,updateComment);
router.delete("/delete/:id",protect,deleteComment);

router.put("/:id/like",protect,commentToggleLike);

export default router
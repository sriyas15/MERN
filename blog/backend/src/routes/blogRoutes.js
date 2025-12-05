import express from 'express'
import { deleteBlog, getAllBlogs, toggleLike, updateBlog, uploadBlog } from '../controller/blogController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from "../middleware/multer.js"


const router = express.Router();

router.post("/post",protect,upload.single("coverImage"),uploadBlog);
router.route("/:id").put(protect,upload.single("coverImage"),updateBlog).delete(protect,deleteBlog);

router.get("/",protect,getAllBlogs);
router.put("/:id/like",protect,toggleLike);

export default router;

import express from 'express'
import { deleteBlog, getAllBlogs, toggleLike, updateBlog, uploadBlog } from '../controller/blogController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
import { upload } from "../middleware/multer.js"

const router = express.Router();

router.post("/post",protect,upload.single("coverImage"),uploadBlog);
router.put("/:id",protect,upload.single("coverImage"),updateBlog);
router.route("/:id").delete(protect,deleteBlog);

router.get("/",protect,getAllBlogs);
router.put("/:id/like",protect,toggleLike);

export default router;
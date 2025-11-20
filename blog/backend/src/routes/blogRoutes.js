import express from 'express'
import { deleteBlog, getAllBlogs, updateBlog, uploadBlog } from '../controller/blogController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/post",protect,uploadBlog);
router.put("/:id",protect,updateBlog);
router.route("/:id").delete(protect,deleteBlog);

router.get("/admin/allBlogs",protect,admin,getAllBlogs);

export default router;
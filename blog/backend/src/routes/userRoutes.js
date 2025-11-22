import express from 'express'
import { getUsers, login, logout, registerUser, updateUser, deleteUser, getProfile } from '../controller/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
import { upload } from "../middleware/multer.js"

const router = express.Router();

router.post("/register",upload.single("avatar"),registerUser);
router.post("/login",login);
router.post("/logout",logout);

router.get("/profile",protect,getProfile);
router.get("/allUsers",protect,admin,getUsers);
router.route("/:id").put(protect,upload.single("avatar"),updateUser).delete(protect,admin,deleteUser)

export default router;
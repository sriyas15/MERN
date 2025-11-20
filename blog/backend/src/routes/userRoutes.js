import express from 'express'
import { getUsers, login, logout, registerUser, updateUser, deleteUser, getProfile } from '../controller/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",login);
router.post("/logout",logout);

router.get("/profile",protect,getProfile);
router.get("/getUsers",protect,admin,getUsers);
router.route("/:id").put(protect,admin,updateUser).delete(protect,admin,deleteUser)

export default router;
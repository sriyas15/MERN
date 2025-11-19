import express from 'express'
import { login, logout, registerUser } from '../controller/userController.js';

const route = express.Router();

route.post("/register",registerUser);
route.post("/login",login);
route.post("/logout",logout);

export default route;
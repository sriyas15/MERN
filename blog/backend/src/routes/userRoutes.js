import express from 'express'
import { login, registerUser } from '../controller/userController.js';

const route = express.Router();

route.post("/register",registerUser);
route.post("/login",login);

export default route;
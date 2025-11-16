import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import router from './src/routes/listRoutes.js';
import cors from 'cors'

dotenv.config({ path: "backend/.env" });
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/list",router);

app.listen(process.env.PORT,(req,res)=>{
    console.log(`Server is Started at 5000`);
})
import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './src/config/db.js';
import { errorMiddleware } from './src/middleware/errorMiddleware.js'
import userRoutes from './src/routes/userRoutes.js';

dotenv.config({path:"backend/.env"});

const app = express();

connectDB();

app.use(express.json());
app.use("/user",userRoutes);

app.use(errorMiddleware);
app.listen(process.env.PORT,(req,res)=>{
    console.log(`Server started at ${process.env.PORT}`);
})
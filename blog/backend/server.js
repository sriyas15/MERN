import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './src/config/db.js';
import { errorMiddleware } from './src/middleware/errorMiddleware.js'
import userRoutes from './src/routes/userRoutes.js';
import blogRoutes from './src/routes/blogRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config({path:"backend/.env"});

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api/blog",blogRoutes)
app.use("/api/users",userRoutes);

app.use(errorMiddleware);
app.listen(process.env.PORT,(req,res)=>{
    console.log(`Server started at ${process.env.PORT}`);
})
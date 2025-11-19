
export const errorMiddleware = (err,req,res,next)=>{

    console.log(`Something went wrong ${err}`);

    const statusCode = res.statusCode !== 200 ? res.statusCode :500

    res.status(statusCode).json({
        message:err.message || "Server Error",
        stack:process.env.NODE_ENV === "production" ? null : err.stack,
    });
}
import jwt from "jsonwebtoken";

export const generateTokens = (res,userId)=>{

    const token = jwt.sign({_id:userId},process.env.JWT_SECRET_KEY,{
        expiresIn:"30d"
    });

    res.cookie("jwt",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge: 30*24*60*60*1000
    });

    return token
}


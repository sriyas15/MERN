import jtw from "jsonwebtoken";

export const generateTokens = (res,userId)=>{

    const token = jtw.sign({userId},process.env.JWT_SECRET_KEY,{
        expiresIn:"30d"
    });

    res.cookie("jwt",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        safeSite:"strict",
        maxAge: 30*24*60*60*1000
    });

    return token
}


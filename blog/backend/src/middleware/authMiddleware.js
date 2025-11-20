import jwt from 'jsonwebtoken'
import { Users } from '../model/userModel.js';

export const protect = async (req,res,next) => {
    
    const token = req.cookies?.jwt;

    if(!token)
        return res.status(401).json({message:"Not Authorized ,No token found"});

    try {
        
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = await Users.findById(decode._id).select("-password");

        if(!req.user)
            return res.status(401).json({message:"Not Authorized ,No user found"});
        next();

    } catch (error) {
        console.log(`Error in auth ${error}`);
        return res.status(401).json({message:"Not Authorized, token failed"});
    }
}

export const admin = async(req,res,next)=>{
        
        if( req.user && req.user.isAdmin )
            next();
        else
            return res.status(403).json({message:"Not Authorized, only admins route"});
    
}
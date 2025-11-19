import { Users } from "../model/userModel.js";
import bcrypt from 'bcrypt';
import { generateTokens } from "../utils/generateTokens.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const registerUser = asyncHandler(async(req, res) => {
    
        const { name,username, email, password } = req.body;

        if (!username || !email || !password)
            return res.status(400).json({ message: "All fields required" });

        const userExist = await Users.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "User's email already exists" });
        }

        const hashPassword = await bcrypt.hash(password,10);

        const newUser = await Users.create({
            name,username, email, password:hashPassword
        });

        generateTokens(res,newUser._id);

        const user = await Users.findById(newUser._id).select("-password");

        res.status(201).json({
            message: "New User Registered",
            user
        });
});


export const login = asyncHandler(async(req,res) => {
        
        const { email,password } = req.body;

        if(!email.trim() || !password.trim())
            return res.status(400).json({message:"Please fill all the fields"});

        const user = await Users.findOne({email}).select("+password");

        if(!user){
             return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password,user.password);
        
        if(!isMatch)
            return res.status(400).json({message:"Invalid Password, your password is wrong"});

        generateTokens(res,user._id);

        const loggedUser = await Users.findById(user._id).select("-password");

        res.status(200).json({message:"Logged In",loggedUser});
})

export const logout = asyncHandler(async(req,res) => {
    
    res.cookie("jwt","",{
        httpOnly:true,
        expires:new Date(0)
    });
    res.json({message:"Logged Out"});
})
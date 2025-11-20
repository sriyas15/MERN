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
    
    res.cookie("jwt", "", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        expires: new Date(0)
    });

    res.json({message:"Logged Out"});
});

export const getProfile = asyncHandler(async(req,res) => {

    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        isAdmin: req.user.isAdmin
    }

    res.status(200).json({message:"User Profile:",user});
})

export const getUsers = asyncHandler(async (req,res) => {
    
    const users = await Users.find().select("-password");
    res.status(200).json({message:"Users Details",users});
});

export const updateUser = asyncHandler(async (req,res) => {

    const user = await Users.findById(req.params.id);

    if(!user)
        return res.status(404).json({message:"User not Found to update"});
    
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.username = req.body.username || user.username;

    if(req.body.password)
        user.password = await bcrypt.hash(req.body.password,10);

    const updatedUser = await user.save();

    res.status(200).json(
        {
            message:`User ${req.params.id} account Updated successfully`,
            updatedUser
        });

});

export const deleteUser = asyncHandler(async (req,res) => {

    const userToDelete = await Users.findByIdAndDelete(req.params.id);

    if(!userToDelete)
        return res.status(404).json({message:"User not Found to delete"});

    if (req.params.id === req.user._id.toString()) {
        return res.status(400).json({ message: "Admin cannot delete self" });
    }

    res.status(200).json({
        message:`User ${req.params.id} deleted successfully`,
        user: userToDelete
    });


});
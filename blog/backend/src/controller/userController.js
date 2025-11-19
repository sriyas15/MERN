import { Users } from "../model/userModel.js";
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
    try {
        const { name,username, email, password } = req.body;

        if (!username || !email || !password)
            return res.status(400).json({ message: "All fields required" });

        const userExist = await Users.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "User's email already exists" });
        }

        const encryptedPassword = await bcrypt.hash(password,10);

        const newUser = await Users.create({
            name,username, email, password:encryptedPassword
        });

        const user = await Users.findById(newUser._id).select("-password");

        res.status(201).json({
            message: "New User Registered",
            user
        });

    } catch (error) {
        console.log("Error in Creating New User", error);
        res.status(500).json({ message: "Server Error" });
    }
};


export const login = async (req,res) => {
    
    try {
        
        const { email,password } = req.body;

        if(!email.trim() || !password.trim())
            return res.status(400).json({message:"Please fill all the fields"});

        const user = await Users.findOne({email}).select("+password");

        if(!user){
             return res.status(400).json({ message: "User not found" });
        }

        const decrypt = await bcrypt.compare(password,user.password);
        
        if(!decrypt)
            return res.status(400).json({message:"Invalid Password, your password is wrong"});

        const loggedUser = await Users.findById(user._id).select("-password");

        res.status(200).json({message:"Logged In",loggedUser});

    } catch (error) {
        console.log(`Something Wrong in Log In ${error}`);
        res.status(500).json({message:"Server Error"});
    }
}
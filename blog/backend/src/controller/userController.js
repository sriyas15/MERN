import { Users } from "../model/userModel.js";
import bcrypt from 'bcrypt';
import { generateTokens } from "../utils/generateTokens.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import cloudinary from "../config/cloudinary.js";

export const registerUser = asyncHandler(async(req, res) => {
    
        const { name,username, email, password } = req.body;

        if ( !name.trim() || !username.trim() || !email.trim() || !password.trim() )
            return res.status(400).json({ message: "All fields required" });

        const userExist = await Users.findOne({
            $or: [ {email},{username} ]
        });

        if (userExist) {
            return res.status(400).json({ message: "User's email or username already exists" });
        }

        const hashPassword = await bcrypt.hash(password,10);

        const userData = {
            name,
            username,
            email,
            password: hashPassword,
        };

        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ folder: "blog/avatars" },(error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(req.file.buffer);
            });

            userData.avatar = {
                public_id: result.public_id,
                url: result.secure_url
            };
        }

        const newUser = await Users.create(userData);

        generateTokens(res,newUser._id);

        const user = await Users.findById(newUser._id).select("-password");

        res.status(201).json({
            message: "New User Registered",
            user
        });
});


export const login = asyncHandler(async(req,res) => {
        
        const { identifier,password } = req.body;

        if(!identifier.trim() || !password.trim())
            return res.status(400).json({message:"Please fill all the fields"});

        const isEmail = identifier.includes("@");

        const user = await Users.findOne(isEmail ? { email:identifier } : { username:identifier }).select("+password");

        if(!user){
             return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password,user.password);
        
        if(!isMatch)
            return res.status(400).json({message:"Invalid Password, your password is wrong"});

        generateTokens(res,user._id);

        const loggedUser = await Users.findById(user._id).select("-password");

        res.status(200).json({message:"Logged In",loggedUser});
});


export const logout = asyncHandler(async(req,res) => {
    
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    });

    res.json({message:"Logged Out"});
});


export const getProfile = asyncHandler(async(req,res) => {

    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        username: req.user.username,
        avatar: req.user.avatar,
        bio:req.user.bio,
        followers:req.user.followers,
        following:req.user.following,
        isAdmin: req.user.isAdmin
    }

    res.status(200).json({message:"User Profile:",user});
});


export const getUsers = asyncHandler(async (req,res) => {
    
    const users = await Users.find().select("-password");
    res.status(200).json({message:"Users Details",users});
});



export const updateUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.params.id);

  if (!user)
    return res.status(404).json({ message: "User not Found to update" });

  if (req.user.id !== req.params.id && !req.user.isAdmin)
    return res.status(403).json({ message: "Not authorized" });

  user.name = req.body.name ?? user.name;
  user.email = req.body.email ?? user.email;
  user.username = req.body.username ?? user.username;
  user.bio = req.body.bio ?? user.bio;

  if (req.body.password) {
    user.password = await bcrypt.hash(req.body.password, 10);
  }

  // AVATAR UPDATE 
  if (req.file) {
    // delete previous avatar
    if (user.avatar?.public_id) 
      await cloudinary.uploader.destroy(user.avatar.public_id);

    // upload new avatar
    const result = await new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder: "blog/avatars" },
        (err, uploaded) => {
          if (err) reject(err);
          else resolve(uploaded);
        }
      );
      upload.end(req.file.buffer);
    });

    user.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  const updatedUser = await user.save();
  updatedUser.password = undefined;

  res.status(200).json({success: true,message: "Profile updated",updatedUser,});
});



export const toggleFollower = asyncHandler(async (req,res) => {

    const usertoFollow = await Users.findById(req.params.id);
    const loggedInUser = await Users.findById(req.user.id); 

    if(!usertoFollow)
        return res.status(404).json({message:"User not Found"});

    if(loggedInUser._id.toString() === usertoFollow._id.toString())
        return res.status(400).json({message:"You cannot follow yourself"});

    const isFollowing = loggedInUser.following.includes(usertoFollow.id);

    if(isFollowing){
        loggedInUser.following.pull(usertoFollow._id);
        usertoFollow.followers.pull(loggedInUser._id);
    }
    else{
        loggedInUser.following.push(usertoFollow._id);
        usertoFollow.followers.push(loggedInUser._id);
    }

    await loggedInUser.save();
    await usertoFollow.save();

    res.status(200).json({message: isFollowing ? "Unfollowed" : "Following",following:loggedInUser.following.length});
});

export const deleteUser = asyncHandler(async (req,res) => {

    const userToDelete = await Users.findById(req.params.id);

    if(!userToDelete)
        return res.status(404).json({message:"User not Found to delete"});

    if (req.params.id === req.user._id.toString())
        return res.status(400).json({ message: "Admin cannot delete self" });

    await userToDelete.deleteOne();

    res.status(200).json({
        message:`User ${req.params.id} deleted successfully`,
        user: userToDelete
    });
});
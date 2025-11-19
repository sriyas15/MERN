import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    avatar:{
        type:String
    },
    bio:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

export const Users = mongoose.model("Users",userSchema); 
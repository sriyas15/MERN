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
        public_id:String,
        url:String
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    }],
    bio:{
        type:String,
        default:"Hey there! I am using this super fun blog site"
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

export const Users = mongoose.model("Users",userSchema); 
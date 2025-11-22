import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    },
    content:{
        type:String,
        required:true
    },
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blogs",
        required:true
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    }]
    
},{timestamps:true});

export const Comments = mongoose.model("Comments",commentSchema);
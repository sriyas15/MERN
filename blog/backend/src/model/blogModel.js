import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({

    title:{
        type:String
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    },
    coverImage:{
        type:String
    },
    likes:{
        type:Number,
        default:0
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comments"
    }]

},{timestamps:true});

export const Blogs = mongoose.model("Blogs",blogSchema);
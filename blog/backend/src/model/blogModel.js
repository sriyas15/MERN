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
        public_id:String,
        url:String
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comments"
    }]

},{timestamps:true});

export const Blogs = mongoose.model("Blogs",blogSchema);

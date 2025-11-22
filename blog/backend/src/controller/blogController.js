import { asyncHandler } from '../middleware/asyncHandler.js'
import { Blogs } from '../model/blogModel.js'

export const uploadBlog = asyncHandler(async (req,res) => {

        const { title,content } = req.body;

        const blog = await Blogs.create({title,content,author:req.user.id});

        res.status(201).json({message:"Blog uploaded",blog});
});

export const updateBlog = asyncHandler(async (req,res) => {

        const update = await Blogs.findById(req.params.id);

        if(!update) return res.status(404).json({message:"Blog not Found"});

        if(update.author.toString() !== req.user.id && !req.user.isAdmin)
                return res.status(401).json({message:"Not Authorized to update"});

        update.title = req.body.title ?? update.title;
        update.content = req.body.content ?? update.content;

        res.status(200).json({message:"Blog updated",update});
});

export const deleteBlog = asyncHandler(async (req,res) => {

        const del = await Blogs.findById(req.params.id);
        
        if(!del) return res.status(404).json({message:"Blog not Found"});

        if( del.author.toString() !== req.user.id && !req.user.isAdmin )
                return res.status(401).json({message:"Not Authorized to delete"});

        await del.deleteOne();
        res.status(200).json({message:"Blog deleted"});
});

export const getAllBlogs = asyncHandler(async (req,res) => {

        const getAll = await Blogs.find();

        if(getAll.length === 0) return res.status(404).json({message:"Blogs not Found"});
        
        res.status(200).json({message:"All Blogs",getAll});
});

export const toggleLike = asyncHandler(async (req,res) => {

        const blog = await Blogs.findById(req.params.id);
        if(!blog) return res.status(404).json({message:"Blog not Found"});

        const userId = req.user.id;
        
        if (!blog.likes) blog.likes = [];

        if( blog.likes?.includes(userId) ){
                blog.likes.pull(userId);
                await blog.save();
                return res.status(200).json({message:"Unliked the post",likes:blog.likes.length});
        }
                
        blog.likes.push(userId);
        await blog.save();

        res.status(201).json({message:"Liked",likes:blog.likes.length});
});
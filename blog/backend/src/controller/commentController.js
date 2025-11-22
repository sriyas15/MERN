import { asyncHandler } from "../middleware/asyncHandler.js";
import { Blogs } from "../model/blogModel.js";
import { Comments } from "../model/commentModel.js";

export const addComment = asyncHandler(async (req,res) => {
    
    const { content } = req.body;
    const blogId = req.params.blogId;

    const blog = await Blogs.findById(blogId);

    if(!blog) return res.status(404).json({message:"Blog not found"});

    const comment = await Comments.create({
        content,
        author:req.user.id,
        blog:blogId
    });

    blog.comments.push(comment._id);
    await blog.save();

    res.status(201).json({message:`Comment added to ${blog.author}'s post` });

});


export const updateComment = asyncHandler(async (req,res) => {

    const { content } = req.body;
    const comment = await Comments.findById(req.params.id);
    
    if(!comment) return res.status(404).json({message:"Comment not found"});

    if( comment.author.toString() !== req.user.id && !req.user.isAdmin)
        return res.status(401).json({message:"Not Authorized to update comment"});

    comment.content = content;
    await comment.save();

    res.status(200).json({message:"Comment Updated",content});

});

export const deleteComment = asyncHandler(async (req,res) => {

    const comment = await Comments.findById(req.params.id);
    if(!comment) return res.status(404).json({message:"Comment not found"});

    if( comment.author.toString() !== req.user.id && !req.user.isAdmin)
        return res.status(401).json({message:"Not Authorized to delete comment"});

    await Blogs.findByIdAndUpdate(comment.blog,{
        $pull: { comments: comment._id }
    });

    await comment.deleteOne();

    res.status(200).json({message:"Comment deleted"});
});

export const getAllComment = asyncHandler(async (req,res) => {

    const blogId = req.params.blogId;

    const getAllComm = await Comments.find({ blog:blogId }).populate("author","name username");

    if(getAllComm.length === 0) return res.status(404).json({message:"No comments found"});

    res.status(200).json({message:"All Comments",getAllComm});
});

export const commentToggleLike = asyncHandler(async (req,res) => {

    const comment = await Comments.findById(req.params.id);
    if(!comment) return res.status(404).json({message:"Comment not found"});

    const userId = req.user.id;

    if(!comment.likes) comment.likes = [];

    if(comment.likes.includes(userId)){
        comment.likes.pull(userId);
        await comment.save();

        return res.status(200).json({message:"Unliked the comment",likes:comment.likes.length});
    }

    comment.likes.push(userId);
    await comment.save();

    res.status(200).json({message:"Liked the comment",likes:comment.likes.length});
    
});
import mongoose from "mongoose";
import blog_model from "../models/blog_model.js";
import user_model from "../models/user_model.js";
export const blog = async (req, res, next) => {
    let allblogs;

    try {
        allblogs = await blog_model.find();
    } catch (err) {
        console.log(`-------------->${err}`);

    }
    return res.status(200).json({allblogs})
}

export const getBlogById = async (req,res, next) => {
    const blogId = req.params.id 
    let blog
    try {
        blog = await blog_model.findById(blogId)
    } catch (err) {
        return res.status(500).json({message:`-------------->${err}`})
    }
    return res.status(200).json({blog})
}


export const updateBlog = async (req,res, next) => {
    const blogId = req.params.id 
    let blog
    const { tittle, description, image, dateAndTime } = req.body;
    try {
        await blog_model.findByIdAndUpdate(blogId, {tittle,description,image,dateAndTime})
    } catch (err) {
        return res.status(500).json({message:`-------------->${err}`})
    }
    return res.status(200).json({message: "Blog Updated"})
}


export const deleteBlog = async (req,res, next) => {
    const blogId = req.params.id 
    let blog
    const { tittle, description, image, dateAndTime } = req.body;
    try {
    blog = await blog_model.findByIdAndRemove(blogId).populate("user")
    await blog.user.blog.pull(blog)
    await blog.user.save()
    } catch (err) {
        return res.status(500).json({message:`-------------->${err}`})
    }
    return res.status(200).json({message: "Blog Deleted"})
}


export const addblog = async (req, res, next) => {
    const { tittle, description, image, dateAndTime, user } = req.body;

    let exituser;
        try {
            exituser = await user_model.findById(user)
        } catch (error) {
            console.log(`--------------->${error}`);
        }
        if (!exituser) {
            return res.status(400).json({message: "Please Register and Continue...."})
        } else {
            
        }

        const blog = new blog_model({tittle, description, image, dateAndTime, user})

        try {
            const session = await mongoose.startSession()
            session.startTransaction()
            await blog.save({session})
            exituser.blog.push(blog)
            await exituser.save({session})
            await session.commitTransaction()
            return res.status(200).json({message: "Blog Saved"})

        } catch (err) {
            console.log(`----------------->${err}`);
            return res.status(500).json({message: err})
        }

}

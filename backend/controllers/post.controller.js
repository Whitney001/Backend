import { populate } from "dotenv";
import { Post } from "../models/post.model.js";

//create a post

const createPost = async (req, res) => {
    try {
        const { name, description, age } = req.body;

        if (!name || !description || !age) {
            return res.status(400).json({
                message: "All Fields are Required"
            });
        }

        const post = await Post.create({ name, description, age });

        res.status(201).json({
            message: "Post Created Successfully", post
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server error", error
        });
    }
}
//read all post
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error", error
        });
    }
}

// Update post
const updatePosts = async (req, res) => {
    try {
        // validation to check if the boby(req.body) is empty
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "No Data Provide for Update"
            })
        }
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!post) return res.status(404).json({
            message: "Post Not Found"
        });

        res.status(200).json({
            message:"Post Has Been Updated", post
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error", error
        });
    }
}

//Delete post
const deletePost = async (req, res) => {
    try {
        const deleted = Post.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({
            message: "Post Not Found"
        });

        res.status(200).json({
            message: "Successfully Deleted"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error", error
        });
    }
}

export {
    createPost,
    getPosts,
    updatePosts,
    deletePost
};

// CRUD- Create, Read, Update, and Delete
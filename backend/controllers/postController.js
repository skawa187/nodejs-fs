import Post from '../models/postModel.js';
import { validationResult, matchedData } from 'express-validator';

// GET all posts
const getPosts = async (req,res) => {
    console.log('Query', req.query);
    const result = validationResult(req);
    const { query: {filter, value} } = req;
    try {
        const { count, rows } = await Post.findAndCountAll();
        return res.status(200).json({ rows, count });
    } catch (err) {
        res.status(500).json({ msg: err });
    }    
};

// GET single post by :id
const getPost = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const post = await Post.findByPk(id);
        if (!post) return res.status(404).json({ msg: `Could not find the post ID: ${id}` });
        return res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

// CREATE new post
const createPost = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) 
        return res.status(400).json({ validationErrors: result.array() });

    const validatedData = matchedData(req);
    try {
        const newPost = Post.build(validatedData);
        await newPost.save();
        console.log(`Saved new post - title: ${newPost.title}`);
        return res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

// UPDATE post :id
const updatePost = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) 
        return res.status(400).json({ validationErrors: result.array() });

    const validatedData = matchedData(req);
    const id = parseInt(req.params.id);
    try {
        const post = await Post.findByPk(id);
        if (!post) return res.status(404).json({ msg: `No post with this ID: ${id}` });
        await post.update(
            validatedData, {
                where: {
                    id: post.id,
                },
            },
        );
        return res.status(200).json({ post });
    } catch (err) {
        res.status(500).json({ msg: `Update post error ${err}` });
    }

}

// DELETE post :id
const deletePost = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        const post = await Post.findByPk(id);
        if (!post) return res.status(404).json({ msg: `No post found with ID ${id}` });
        await post.destroy({
            where: {
                id: post.id,
            },
        });
        return res.status(200).json({ msg: `Removed post ID ${post.id}`});
    } catch (err) {
        res.status(500).json({ msg: `Delete post error ${err}` });
    }
}

export {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
}
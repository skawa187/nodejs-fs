import { validationResult, matchedData } from 'express-validator';
import Post from '../models/postModel.js';

let posts = [
    { id: 1, title: 'Post 1'},
    { id: 2, title: 'Post 2'},
    { id: 3, title: 'Post 3'},
]

// Get all posts
const getPosts = (req,res) => {
    console.log('Query', req.query);
    const result = validationResult(req);
    const { query: {filter, value} } = req;
    if (filter && value) {
        res.status(200);
        return res.send(posts.filter((post) => post[filter].includes(value)));
    }
    return res.status(200).json(posts);
    
}

// Get single post by :id
const getPost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post)=>post.id === id);

    if (!post) {
        const error = new Error(`Post ${id} not found.`);
        error.status = 404;
        return next(error);
    }

    return res.status(200).json(post);
};

// Create new post
const createPost = (req, res) => {
    const result = validationResult(req);
    console.log(result);
    if (!result.isEmpty()) 
        return res.status(400).json({ validationErrors: result.array() });

    const validatedData = matchedData(req);
    const newPost = {
        id: posts.length +1,
        ...validatedData
    }
    posts.push(newPost);
    
    res.status(201).json(posts);
};

// Update post
const updatePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        const error = new Error(`Post ${id} not found.`);
        error.status = 404;
        return next(error);
    }

    post.title = req.body.title;
    res.status(200).json(posts);
}

// Delete post
const deletePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const postId = posts.findIndex((post) => post.id === id);
    if (postId === -1) {
        const error = new Error(`Could not find post id: ${id}`);
        error.status = 404;
        return next(error);
    }
    posts.splice(postId, 1);
    return res.status(200).json(posts);

}

export {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
}
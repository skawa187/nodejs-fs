import express from 'express';
import { query, body, checkSchema } from 'express-validator';
import { createPost, getPost, updatePost, getPosts, deletePost } from '../controllers/postController.js';
import { createPostValidation } from '../utils/validationSchema.js';

const router = express.Router();

router.get('/', query('filter').isString().notEmpty(), getPosts);

router.get('/:id', getPost);

router.post('/', checkSchema(createPostValidation), createPost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);


export default router;
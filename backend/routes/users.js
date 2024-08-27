import express from 'express';
import { checkSchema } from 'express-validator';
import { createUserValidation, getUsersValidation } from '../utils/validationSchema.js';
import { getUsers, getUser, createUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', checkSchema(getUsersValidation) ,getUsers);
router.get('/:id', checkSchema(getUsersValidation) ,getUser);
router.post('/', checkSchema(createUserValidation), createUser);
router.delete('/:id', deleteUser);


export default router;
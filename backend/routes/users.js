import express from 'express';
import { checkSchema } from 'express-validator';
import { createUserValidation } from '../utils/validationSchema.js';
import { createUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/', checkSchema(createUserValidation) ,createUser);


export default router;
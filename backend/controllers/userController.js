import User from '../models/userModel.js';
import { validationResult, matchedData } from 'express-validator';
import { hashPasswd } from '../utils/helpers.js';

const createUser = async (req, res) => {
    // Check validation
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send(result.array());
    // Build an user and save to the DB
    const body = matchedData(req);
    body.password = hashPasswd(body.password);
    const newUser = User.build(body);
    console.log(newUser.toJSON());
    try {
        await newUser.save();
        console.log('New user saved to the DB');
        return res.status(201).json(newUser.toJSON());
    } catch (err) {
        console.error('Saving to the DB error');
        res.status(400).json({msg: 'DB error', error: err});
    }
}

export {
    createUser,
}
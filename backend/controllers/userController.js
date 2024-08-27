import User from '../models/userModel.js';
import Post from '../models/postModel.js';
import { validationResult, matchedData } from 'express-validator';
import { hashPasswd } from '../utils/helpers.js';

// GET all users
const getUsers = async (req, res) => {
    // Check validation
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send(result.array());
    
    const { filter, value } = req.query;
    let where;
    (filter && value) ? where = { [filter]: value } : where = {}
    try {
        const allUsers = await User.findAll({
            where: where,
            attributes: ['id','username', 'fullname', 'age'],
            include: Post,
        });
        res.status(200).json(allUsers);
    } catch (err) {
        console.error('Error fetching users: ', err);
        res.status(500).send(err);
    }

};

// GET one user by :id
const getUser = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const user = await User.findByPk(id, { attributes: ['id','username', 'fullname', 'age'] });
        if (!user) return res.status(404).json({ msg: `User id ${id} was not found` });
        res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user ', err);
        res.status(500).send(err);
    }
};

// POST new user
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
};

// DELETE a user
const deleteUser = async (req, res) => {
    const userId = parseInt(req.params.id);
    try {
        const savedUser = await User.findByPk(userId);
        if (!savedUser) return res.status(404).json({msg: `Could not find the user ID ${userId} `});
        await User.destroy({
            where: { id: userId },
        });
        return res.status(200).json({msg: `Removed user ${savedUser.username} - ID ${userId}`});
        
    } catch (err) {
        console.log('Delete user - error: ', err);
        res.status(500);
    }
};

export {
    getUsers,
    getUser,
    createUser,
    deleteUser,
}
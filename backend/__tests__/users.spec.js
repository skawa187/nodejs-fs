import { matchedData, validationResult } from "express-validator";
import validator from 'express-validator';
import helpers from '../utils/helpers.js';
import { getUsers, getUser, createUser } from "../controllers/userController.js";
import User from '../models/userModel.js';

let mockReq = {};
let mockRes = {};

const mockUsers = [
    {
        "id": 1,
        "username": "admin",
        "fullname": "Admin X",
        "age": 18
    },
    {
        "id": 2,
        "username": "john",
        "fullname": "John Doe",
        "age": 19,
    }
];
const mockUser = mockUsers[0];

// Mock validation logic
jest.mock('express-validator', () => ({
    validationResult: jest.fn(() => ({
        isEmpty: jest.fn().mockReturnValue(true),
        array: jest.fn().mockReturnValue([]),
    })),
    matchedData: jest.fn(() => ({
        username: 'testuser',
        password: 'test123',
    })),
}));

// Mock hashing fn
jest.mock('../utils/helpers.js', () => ({
    hashPasswd: jest.fn((passwd) => `hashed_${passwd}`),
}));

// Mock db model
jest.mock('../models/userModel.js');

describe('get a list of all users', () => {
    beforeEach(() => {
        mockReq = {
            query: [],
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
        };
        jest.spyOn(User, 'findAll').mockResolvedValue(mockUsers);
    });
    test('should return a list of users with status 200', async () => {
        await getUsers(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockUsers);
    });
});

describe('get one user', () => {
    beforeEach(() => {
        mockReq = {
            params: { id: 1 }
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
        };
    });
    test('should return an user object with status 200', async () => {
        jest.spyOn(User, 'findByPk').mockResolvedValue(mockUser);

        await getUser(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockUser);
    });
    test('should return status 404', async () => {
        jest.spyOn(User, 'findByPk').mockResolvedValue(null);

        await getUser(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalled();
    });
});

describe('create a new user', () => {
    beforeEach(() => {
        mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
        };
    });
    test('should not pass req validation and return with status 400', async () => {
        jest.spyOn(validator, 'validationResult').mockImplementationOnce(() => ({
            isEmpty: jest.fn().mockReturnValue(false),
            array: jest.fn().mockReturnValue([{ msg: 'Test message' }]),
        }));
        await createUser(mockReq, mockRes);
        expect(validationResult).toHaveBeenCalledWith(mockReq);
        expect(mockRes.status).toHaveBeenLastCalledWith(400);
        expect(mockRes.send).toHaveBeenCalledWith([{ msg: 'Test message' }]);
    });
    test('should create a user and return with status 201', async () => {
        const build = jest.spyOn(User, 'build').mockReturnValue(User.prototype);
        const save = jest.spyOn(User.prototype, 'save');
        
        await createUser(mockReq, mockRes);
        expect(validationResult).toHaveBeenCalledWith(mockReq);
        expect(matchedData).toHaveBeenCalledWith(mockReq);
        expect(helpers.hashPasswd).toHaveBeenCalledWith('test123');
        expect(build).toHaveBeenCalled();
        expect(save).toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(201);
    });
    test('should fail to save a user and return with status 400', async () => {
        const rejectedSave = jest.spyOn(User.prototype, 'save').mockRejectedValue('Error while saving to database');
        await createUser(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith(expect.any(Object));
    });
});
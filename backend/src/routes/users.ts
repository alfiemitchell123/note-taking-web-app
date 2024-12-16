import { Router, Request, Response } from 'express';
import db from '../db';
import { body, validationResult } from 'express-validator';
import { QueryResult, ResultSetHeader } from 'mysql2';
import { getAllUsers, addUser } from '../services/userService';

const router = Router();

const validationRules = [
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password_hash').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
];

// Get all users
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve users', error });
    }
});

// Add a new user
router.post('/', validationRules, async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { email, password_hash } = req.body;
    const query = 'INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, NOW())';

    try {
        const userId = await addUser(email, password_hash);
        res.status(201).json({ message: "User registered successfully", userId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to register user', error });
    }
});

export default router;
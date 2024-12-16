import db from '../db';
import { QueryResult, ResultSetHeader } from 'mysql2';

// Get all users
export const getAllUsers = async (): Promise<QueryResult> => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users', (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// Add a new user
export const addUser = async (email: string, passwordHash: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, NOW())';
        db.query(query, [email, passwordHash], (err, results) => {
            if (err) reject(err);
            else {
                const result = results as ResultSetHeader;
                resolve(result.insertId);
            }
        });
    });
};

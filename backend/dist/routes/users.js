"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const router = (0, express_1.Router)();
router.post('/register', (req, res) => {
    const { email, password_hash } = req.body;
    const query = 'INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, NOW())';
    db_1.default.query(query, [email, password_hash], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to register user');
        }
        else {
            res.status(201).send('User registered successfully');
        }
    });
});
exports.default = router;

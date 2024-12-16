import dotenv from 'dotenv';
import path from 'path';
import express, { Request, Response } from 'express';
import db from './db';
import usersRouter from './routes/users';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
app.use(express.json());

db.connect((err: Error | null) => { // Connect to the database
    if (err) throw err;
    console.log("Connected to MySQL database!");
});

app.get('/', (req: Request, res: Response) => {
    res.json('Welcome to the Note Taking App API!');
});

// Mount the users router
app.use('/users', usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

export default app;
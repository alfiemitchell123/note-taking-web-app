import request from 'supertest';
import app from '../backend/src/server';
import db from '../backend/src/db';
import { faker } from '@faker-js/faker';
import { Server } from 'http';

let server: Server;

beforeAll(async () => {
    const port = 0;
    server = app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

afterAll(async () => {
    await new Promise<void>((resolve) => {
        server.close(() => {
            resolve();
        });
    });
    db.end();
});

describe('POST /users', () => {
    test('should add a user', async () => {
        const user = {
            email: faker.internet.email(),
            password_hash: "password123"
        }

        const response = await request(server).post('/users').send(user);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('userId');
    });
});

describe('GET /users', () => {
    test('should return a list of users', async () => {
        const response = await request(server).get('/users');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('length');
    });
});
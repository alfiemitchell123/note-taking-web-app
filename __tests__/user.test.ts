import request from 'supertest';
import app from '../backend/src/server';
import db from '../backend/src/db';
import { faker } from '@faker-js/faker';
import { Server } from 'http';
import { AddressInfo } from 'net';
import { closeServer } from '../backend/src/server';

let server: Server;
let serverPort: number;

beforeAll(async () => {
    server = app.listen(0, () => {
        serverPort = (server.address() as AddressInfo).port;  // Capture dynamically assigned port
        console.log(`Server is running on http://localhost:${serverPort}`);
    });
});

afterAll(() => {
    server.close();
    closeServer();  // This will stop the server and close the DB connection
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
const request = require('supertest');
const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });

const app = require('../server');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth API', () => {
  it('should return a token for valid student credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'anto@student.com',
        password: '111111'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should return 401 for invalid student credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'anto@student.com',
        password: 'wrongpass'
      });
    console.log("🔑 TOKEN PRIMIT:", res.body.token);
    expect(res.statusCode).toBe(401);
  });

  it('should return a token for valid teacher credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'john@teacher.com',
        password: '123456'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should return 401 for invalid teacher credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'john@teacher.com',
        password: 'wrongpass'
      });

    expect(res.statusCode).toBe(401);
  });
});

const request = require('supertest');
const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });

const app = require('../server');

describe('Student Features', () => {
  let token;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'anto@student.com', password: '111111' });

    token = loginRes.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return student profile data', async () => {
    const res = await request(app)
      .get('/api/students/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('email', 'anto@student.com');
    expect(Array.isArray(res.body.grades)).toBe(true);
  });
});

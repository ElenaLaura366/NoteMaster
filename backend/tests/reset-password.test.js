const request = require('supertest');
const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });

const app = require('../server');
const Student = require('../models/Student');

describe('Password Reset API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    // Creăm un student test
    await Student.create({
      name: 'Test Student',
      email: 'reset@student.com',
      password: 'oldpassword'
    });
  });

  afterAll(async () => {
    await Student.deleteMany({ email: 'reset@student.com' }); // cleanup
    await mongoose.connection.close();
  });

  it('should reset password successfully', async () => {
    const res = await request(app)
      .post('/api/auth/reset-password')
      .send({
        email: 'reset@student.com',
        newPassword: 'newsecurepassword'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Parola a fost resetată cu succes.');
  });

  it('should not allow same old password', async () => {
    const res = await request(app)
      .post('/api/auth/reset-password')
      .send({
        email: 'reset@student.com',
        newPassword: 'newsecurepassword'
      });

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe('Noua parolă nu poate fi identică cu parola veche.');
  });

  it('should return 404 if user not found', async () => {
    const res = await request(app)
      .post('/api/auth/reset-password')
      .send({
        email: 'nonexistent@student.com',
        newPassword: 'whatever123'
      });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Utilizatorul nu a fost găsit.');
  });
});

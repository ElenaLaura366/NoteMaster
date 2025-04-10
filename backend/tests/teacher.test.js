const request = require('supertest');
const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });

const app = require('../server');
const Teacher = require('../models/Teacher');

describe('Teacher API', () => {
  let createdTeacherId;
  let token;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    // Login profesor existent (asigură-te că ai profesorul john@teacher.com în DB)
    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'john@teacher.com',
      password: '123456',
    });

    token = loginRes.body.token;
  });

  afterAll(async () => {
    await Teacher.deleteMany({});
    await mongoose.connection.close();
  });

  it('should create a new teacher', async () => {
    const res = await request(app)
      .post('/api/teachers')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Prof. Test',
        email: 'test@teacher.com',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Prof. Test');
    createdTeacherId = res.body._id;
  });

  it('should get all teachers', async () => {
    const res = await request(app)
      .get('/api/teachers')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a teacher', async () => {
    const res = await request(app)
      .put(`/api/teachers/${createdTeacherId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Prof. Actualizat' });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Prof. Actualizat');
  });

  it('should delete the teacher', async () => {
    const res = await request(app)
      .delete(`/api/teachers/${createdTeacherId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Teacher deleted');
  });
});

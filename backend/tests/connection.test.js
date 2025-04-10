const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // ✔ sigur
console.log('URI:', process.env.MONGO_URI); // trebuie să vezi stringul cu 127.0.0.1
const mongoose = require('mongoose');

describe('Database Connection', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should connect to the MongoDB database', () => {
    const state = mongoose.connection.readyState;
    expect(state).toBe(1); // 1 = connected
  });
});

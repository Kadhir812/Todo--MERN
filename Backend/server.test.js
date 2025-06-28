const request = require('supertest');
const app = require('./server');

describe('Todo API', () => {
  it('should return 400 when creating a todo with missing fields', async () => {
    const res = await request(app)
      .post('/todos')
      .send({ task: 'Test Task' }); // missing date and priority
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should fetch all todos (array)', async () => {
    const res = await request(app).get('/todos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
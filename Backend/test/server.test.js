const request = require('supertest');
const { MongoClient } = require('mongodb');
const { app, setDb } = require('../server');

let connection;
let db;

beforeAll(async () => {
  // Connect to local MongoDB test database
  connection = await MongoClient.connect('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  db = connection.db('todo_app_test');
  setDb(db);

  // Optionally, clear the todos collection before tests
  await db.collection('todos').deleteMany({});
});

afterAll(async () => {
  // Clean up and close the connection
  await connection.close();
});

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
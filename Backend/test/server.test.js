const request = require('supertest');
const { MongoClient } = require('mongodb');
const { app, setDb } = require('../server');

let connection;
let db;

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGO_DBNAME || 'todo_app_test';

beforeAll(async () => {
  // Connect to MongoDB test database (works in CI and locally)
  connection = await MongoClient.connect(mongoUri, {
    useUnifiedTopology: true,
  });
  db = connection.db(dbName);
  setDb(db);

  // Clear the todos collection before tests
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
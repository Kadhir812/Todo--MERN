const request = require('supertest');
const { MongoClient } = require('mongodb');
const { app, setDb, client, server } = require('../server');

jest.setTimeout(20000); // 20 seconds

let connection;
let db;

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGO_DBNAME || 'todo_app_test';

async function waitForMongo(uri, dbName, retries = 10, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      const conn = await MongoClient.connect(uri, { });
      return conn;
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(res => setTimeout(res, delay));
    }
  }
}

beforeAll(async () => {
  // Wait for MongoDB to be ready
  connection = await waitForMongo(mongoUri, dbName);
  db = connection.db(dbName);
  setDb(db);

  // Clear the todos collection before tests
  await db.collection('todos').deleteMany({});
});

afterAll(async () => {
  if (client) await client.close();
  if (server && server.close) await server.close();
  if (connection) await connection.close();
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
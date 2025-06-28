const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const moment = require('moment-timezone');

const app = express();
app.use(cors());
app.use(express.json());
//while building image use the below mongod line
const mongoUri = 'mongodb://mongod:27017'; 

//while running locally use the below localhost line
// const mongoUri = 'mongodb://localhost:27017'; 
const client = new MongoClient(mongoUri);
let db;

// Connect to MongoDB
client.connect()
  .then(() => {
    db = client.db('todo_app'); // Database name
    console.log('Connected to MongoDB.');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// CRUD Operations

/** Create a new todo */
app.post('/todos', async (req, res) => {
  try {
    const { task, date, priority, completed = false } = req.body;

    if (!task || !date || !priority) {
      return res.status(400).json({ error: 'Task, date, and priority are required.' });
    }

    // Ensure valid priority value
    const validPriorities = ['Low', 'Medium', 'High'];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ error: 'Invalid priority value. Choose from Low, Medium, or High.' });
    }

    const newTodo = {
      task,
      date: moment.tz(date, 'Asia/Kolkata').utc().toDate(), // Convert to UTC
      priority,
      completed,
    };

    const result = await db.collection('todos').insertOne(newTodo);
    res.status(201).json({ id: result.insertedId, ...newTodo });
  } catch (err) {
    console.error('Error creating todo:', err);
    res.status(500).json({ error: 'Error creating todo' });
  }
});

/** Get all todos */
app.get('/todos', async (req, res) => {
  try {
    const todos = await db.collection('todos').find().toArray();

    // Format dates and add priority, completed status in the response
    const formattedTodos = todos.map(todo => ({
      id: todo._id,
      task: todo.task,
      date: moment(todo.date).format('YYYY-MM-DD'), // Format as YYYY-MM-DD
      priority: todo.priority,
      completed: todo.completed,
    }));

    res.status(200).json(formattedTodos);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Error fetching todos' });
  }
});

/** Update a todo by ID */
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { task, date, priority, completed } = req.body;

    console.log('PUT Request Received:', { id, task, date, priority, completed });

    // Validate ID format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format.' });
    }

    // Ensure at least one of 'task', 'date', 'priority', or 'completed' is provided
    if (!task && !date && !priority && completed === undefined) {
      return res.status(400).json({ error: 'At least one of task, date, priority, or completed must be provided.' });
    }

    // Prepare the object to update
    const updatedTodo = {};
    if (task) updatedTodo.task = task;
    if (priority) updatedTodo.priority = priority;
    if (completed !== undefined) updatedTodo.completed = completed;

    // Handle time updates
    if (date) {
      try {
        const newDate = moment.tz(date, 'Asia/Kolkata').utc().toDate(); // Convert to UTC
        updatedTodo.date = newDate;
      } catch (err) {
        return res.status(400).json({ error: 'Invalid date format.' });
      }
    }

    // Perform the update in MongoDB
    const result = await db.collection('todos').updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedTodo }
    );

    console.log('Update Result:', result);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Todo not found.' });
    }

    res.status(200).json({ message: 'Todo updated successfully.' });
  } catch (err) {
    console.error('Error updating todo:', err);
    res.status(500).json({ error: 'Error updating todo.' });
  }
});

/** Delete a todo by ID */
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    console.log('DELETE Request Received:', { id });

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format.' });
    }

    const result = await db.collection('todos').deleteOne({ _id: new ObjectId(id) });

    console.log('Delete Result:', result);

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Todo not found.' });
    }

    res.status(200).json({ message: 'Todo deleted successfully.' });
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).json({ error: 'Error deleting todo.' });
  }
});

/** Toggle the completed status of a todo */
app.patch('/todos/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;

    console.log('PATCH Request to toggle completion:', { id });

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format.' });
    }

    // Fetch the current todo to get its current completed status
    const todo = await db.collection('todos').findOne({ _id: new ObjectId(id) });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found.' });
    }

    // Toggle the completed status
    const updatedCompleted = !todo.completed;

    // Update the completed status in the database
    const result = await db.collection('todos').updateOne(
      { _id: new ObjectId(id) },
      { $set: { completed: updatedCompleted } }
    );

    console.log('Completion Toggle Result:', result);

    res.status(200).json({ message: `Todo marked as ${updatedCompleted ? 'completed' : 'incomplete'}.` });
  } catch (err) {
    console.error('Error toggling completion:', err);
    res.status(500).json({ error: 'Error toggling completion.' });
  }
});

/** Graceful shutdown */
process.on('SIGINT', async () => {
  try {
    await client.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    process.exit(1);
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

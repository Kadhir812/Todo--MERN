import React, { useState, useEffect } from 'react';
import TodoForm from './Components/TodoForm';
import TodoList from './Components/TodoList';
import Dashboard from './Components/Dashboard';
import axios from 'axios';
import Navbar from './Layouts/Navbar'; // Import the updated Navbar

function App() {
  const [todos, setTodos] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Fetch todos once on component mount
  useEffect(() => {
    axios
      .get('http://localhost:5000/todos')
      .then((response) => setTodos(response.data))
      .catch((error) => console.error('Error fetching todos: ', error));
  }, []);

  const addTodo = (task, date, priority) => {
    axios
      .post('http://localhost:5000/todos', { task, date, priority })
      .then((response) => {
        setTodos((prevTodos) => [...prevTodos, response.data]);
      })
      .catch((error) => {
        console.error('Error adding todo:', error);
      });
  };

  const updateTodo = (id, task, date, priority, completed) => {
    axios
      .put(`http://localhost:5000/todos/${id}`, {
        task,
        date,
        priority,
        completed,
      })
      .then(() => {
        const updatedTodos = todos.map((todo) =>
          todo.id === id
            ? { ...todo, task, date, priority, completed }
            : todo
        );
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.error('Error updating todo:', error);
      });
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.error('Error deleting todo:', error);
      });
  };

  const handleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const updatedCompleted = !todo.completed;

    try {
      const response = await fetch(
        `http://localhost:5000/todos/${id}/complete`,
        {
          method: 'PATCH',
        }
      );
      const result = await response.json();

      if (response.ok) {
        updateTodo(id, todo.task, todo.date, todo.priority, updatedCompleted);
      } else {
        console.error('Error toggling completion:', result);
      }
    } catch (err) {
      console.error('Error toggling completion:', err);
    }
  };

  const toggleDarkMode = (isDark) => {
    setIsDarkMode(isDark);
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-blue-200 text-gray-900'
      }`}
    >
      {/* Navbar with props */}
      <Navbar
        todos={todos}
        onToggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
      />

      <div className="container mx-auto p-4">
        {/* Dashboard Section */}
        <Dashboard todos={todos} isDarkMode={isDarkMode} />

        <div className="todo-app mt-5">
          <TodoForm isDarkMode={isDarkMode} addTodo={addTodo} />
          <TodoList
            isDarkMode={isDarkMode}
            todos={todos}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            handleComplete={handleComplete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

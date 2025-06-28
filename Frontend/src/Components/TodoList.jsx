import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

function TodoList({ todos, updateTodo, deleteTodo, isDarkMode }) {
  const [editingTodo, setEditingTodo] = useState(null);
  const [updatedTask, setUpdatedTask] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const [updatedPriority, setUpdatedPriority] = useState("Medium");

  const handleEditClick = (todo) => {
    setEditingTodo(todo.id);
    setUpdatedTask(todo.task);
    setUpdatedDate(todo.date);
    setUpdatedPriority(todo.priority);
  };

  const handleUpdate = (id) => {
    updateTodo(id, updatedTask, updatedDate, updatedPriority);
    setEditingTodo(null);
    setUpdatedTask("");
    setUpdatedDate("");
    setUpdatedPriority("Medium");
  };

  const handleComplete = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const updatedCompleted = !todo.completed;
    updateTodo(id, todo.task, todo.date, todo.priority, updatedCompleted);
  };

  // Categorize todos
  const categorizedTodos = {
    Personal: todos.filter((todo) => todo.priority === "Low"),
    Work: todos.filter((todo) => todo.priority === "Medium"),
    Urgent: todos.filter((todo) => todo.priority === "High"),
  };

  const renderTodos = (todos) =>
    todos.map((todo) => (
      <motion.div
        key={todo.id}
        className={`p-4 rounded-md shadow-md transition duration-300 ${
          isDarkMode
            ? "bg-stone-600 text-light-pink hover:shadow-light-pink"
            : "bg-blue-100 text-blue-700 hover:shadow-blue-400"
        }`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {editingTodo === todo.id ? (
          <div className="space-y-2">
            {/* Edit Fields */}
            <input
              type="text"
              value={updatedTask}
              onChange={(e) => setUpdatedTask(e.target.value)}
              className={`p-3 w-full border rounded-md focus:ring-2 ${
                isDarkMode
                  ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:ring-light-pink"
                  : "bg-blue-50 text-blue-700 border-blue-200 placeholder-gray-600 focus:ring-blue-300"
              }`}
            />
            <input
              type="date"
              value={updatedDate}
              onChange={(e) => setUpdatedDate(e.target.value)}
              className={`p-3 w-full border rounded-md focus:ring-2 ${
                isDarkMode
                  ? "bg-gray-700 text-white border-gray-600 focus:ring-light-pink"
                  : "bg-blue-50 text-blue-700 border-blue-200 focus:ring-blue-300"
              }`}
            />
            <select
              value={updatedPriority}
              onChange={(e) => setUpdatedPriority(e.target.value)}
              className={`p-3 w-full border rounded-md focus:ring-2 ${
                isDarkMode
                  ? "bg-gray-700 text-white border-gray-600 focus:ring-light-pink"
                  : "bg-blue-50 text-blue-700 border-blue-200 focus:ring-blue-300"
              }`}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <button
              onClick={() => handleUpdate(todo.id)}
              className={`p-3 rounded-md mt-4 font-semibold transition duration-300 ${
                isDarkMode
                  ? "bg-moody-pink text-white hover:bg-light-pink"
                  : "bg-blue-300 text-gray-800 hover:bg-blue-400"
              }`}
            >
              Update
            </button>
          </div>
        ) : (
          <div>
            <p className={`text-lg font-bold ${isDarkMode ? "text-light-pink" : "text-blue-700"}`}>
              {todo.task}
            </p>
            <p className={`text-sm font-bold ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              {todo.date}
            </p>
            <p className={`text-sm ${isDarkMode ? "text-light-pink" : "text-blue-600"}`}>
              Completed: {todo.completed ? "Yes" : "No"}
            </p>
          </div>
        )}
        <div className="flex space-x-4 mt-3">
          {editingTodo === todo.id ? (
            <button
              onClick={() => setEditingTodo(null)}
              className={`transition duration-200 ${
                isDarkMode
                  ? "text-deep-red hover:text-light-pink"
                  : "text-blue-500 hover:text-blue-600"
              } font-bold`}
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={() => handleEditClick(todo)}
              className={`transition duration-200 ${
                isDarkMode
                  ? "text-deep-red hover:text-light-pink"
                  : "text-blue-500 hover:text-blue-600"
              } font-bold`}
            >
              Edit
            </button>
          )}
          <button
            onClick={() => handleComplete(todo.id)}
            className={`transition duration-200 ${
              isDarkMode
                ? "text-green-500 hover:text-light-pink"
                : "text-green-500 hover:text-green-600"
            } font-bold`}
          >
            {todo.completed ? "Incomplete" : "Completed"}
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className={`transition duration-200 ${
              isDarkMode
                ? "text-soft-blue hover:text-light-pink"
                : "text-red-500 hover:text-red-600"
            } font-bold`}
          >
            Delete
          </button>
        </div>
      </motion.div>
    ));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {["Personal", "Work", "Urgent"].map((category) => (
        <div key={category} className="space-y-4">
          <h2
            className={`text-xl font-bold text-center ${
              isDarkMode ? "text-light-pink" : "text-blue-700"
            }`}
          >
            {category}
          </h2>
          <AnimatePresence>
            {categorizedTodos[category].map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="transition-all ease-in-out"
              >
                {renderTodos([todo])}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}


TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default TodoList;

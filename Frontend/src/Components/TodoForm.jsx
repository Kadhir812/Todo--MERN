import  { useState } from 'react';
import PropTypes from 'prop-types';

function TodoForm({ addTodo, isDarkMode }) {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('Medium'); // Add priority state
  const [completed, setCompleted] = useState(false); // Add completed state


  const handleSubmit = (e) => {
    e.preventDefault();
    if (task && date) {
      addTodo(task, date, priority, completed); // Pass completed to addTodo
      setTask('');
      setDate('');
      setPriority('Medium'); // Reset priority to default
      setCompleted(false); // Reset completed state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col items-center space-y-4">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter Task"
        className={`p-3 w-64 border rounded-md focus:ring-2 font-semibold ${
          isDarkMode 
            ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:ring-light-pink' 
            : 'bg-blue-100 text-gray-800 border-gray-300 placeholder-gray-500 focus:ring-blue-300'
        }`}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={`p-3 w-64 border rounded-md focus:ring-2 font-semibold ${
          isDarkMode 
            ? 'bg-gray-700 text-white border-gray-600 focus:ring-light-pink' 
            : 'bg-blue-100 text-gray-800 border-gray-300 focus:ring-blue-300'
        }`}
      />
      {/* Add priority dropdown */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className={`p-3 w-64 border rounded-md focus:ring-2 font-semibold ${
          isDarkMode 
            ? 'bg-gray-700 text-white border-gray-600 focus:ring-light-pink' 
            : 'bg-blue-100 text-gray-800 border-gray-300 focus:ring-blue-300'
        }`}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button
        type="submit"
        className={`p-3 rounded-md mt-4 font-semibold transition duration-300 ${
          isDarkMode 
            ? 'bg-moody-pink text-white hover:bg-light-pink' 
            : 'bg-blue-300 text-gray-800 hover:bg-blue-400'
        }`}
      >
        Add Todo
      </button>
    </form>
  );
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default TodoForm;

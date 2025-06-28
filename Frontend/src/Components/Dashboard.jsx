
import { motion } from 'framer-motion'; // Import only Framer Motion
import PropTypes from 'prop-types';

function Dashboard({ todos, isDarkMode }) {
  // Calculate task statistics
  const priorityCounts = {
    Low: 0,
    Medium: 0,
    High: 0,
  };

  let completedCount = 0;
  let totalCount = todos.length;

  todos.forEach((todo) => {
    priorityCounts[todo.priority]++;
    if (todo.completed) completedCount++;
  });

  const completionPercentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-stone-700 text-light-pink' : 'bg-blue-100 text-gray-800'}`}>
      <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Progress Tracker */}
        <motion.div
          className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-center">Progress Tracker</h3>
          <div className="relative w-full h-6 bg-gray-300 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${isDarkMode ? 'bg-teal-500' : 'bg-blue-500'}`}
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              style={{ borderRadius: 'inherit' }}
            />
          </div>
          <p className="mt-4 text-center text-lg font-semibold">
            {completionPercentage}% Tasks Completed
          </p>
        </motion.div>

        {/* Priority Overview */}
        <motion.div
          className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-center">Task Priority</h3>
          <div className="space-y-4">
            {['Low', 'Medium', 'High'].map((priority) => (
              <motion.div
                key={priority}
                className="flex justify-between items-center p-3 rounded-md"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: priorityCounts[priority] * 0.1 }}
                style={{
                  backgroundColor: isDarkMode
                    ? priority === 'High' ? '#ff6b6b' : priority === 'Medium' ? '#ffa36b' : '#6bff88'
                    : priority === 'High' ? '#ff8a80' : priority === 'Medium' ? '#ffd180' : '#ccff90',
                  color: isDarkMode ? '#fff' : '#000',
                }}
              >
                <span className="font-bold">{priority} Priority</span>
                <span>{priorityCounts[priority]}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  todos: PropTypes.array.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default Dashboard;

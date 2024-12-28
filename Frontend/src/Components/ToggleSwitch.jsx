// src/components/ToggleSwitch.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ToggleSwitch = ({ onToggle }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    onToggle(!isDarkMode); // Notify the parent component about the mode change
  };

  return (
    <div className="flex items-center justify-end">
      <span className="mr-2 text-gray-800 font-semibold dark:text-green-500">Light</span>
      <motion.button
        className="w-12 h-6 bg-lightBlue dark:bg-pink rounded-full relative"
        onClick={handleToggle}
        whileTap={{ scale: 0.9 }} // Animation on click
      >
        <motion.div
          className="w-6 h-6 bg-white rounded-full absolute top-0 left-0"
          animate={{
            x: isDarkMode ? '100%' : '0%',
          }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
      </motion.button>
      <span className="ml-2 text-gray-800 font-semibold dark:text-green-500">Dark</span>
    </div>
  );
};

export default ToggleSwitch;

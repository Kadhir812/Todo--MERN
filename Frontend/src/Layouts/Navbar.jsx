import { useState } from 'react';
import PropTypes from 'prop-types';
import ToggleSwitch from '../Components/ToggleSwitch';

function Navbar({ todos, onToggleDarkMode, isDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={` ${isDarkMode ? 'text-gray-200' : 'text-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-xl font-bold">Todo List</div>

          {/* Todo List Summary */}
          <div className="hidden sm:block text-sm">
            <p className="text-gray-400">
              <span className="font-medium">Total Todos:</span> {todos.length}
            </p>
          </div>

          {/* Toggle Dark Mode */}
          <div className="hidden sm:block">
            <ToggleSwitch onToggle={onToggleDarkMode} />
          </div>

          {/* Signup Button */}
          <div className="hidden sm:block">
            <button
              className="bg-blue-600 text-white font-medium px-4 py-2 rounded-full hover:bg-blue-500"
            >
              Signup
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Dropdown Menu for Mobile */}
        <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
          <div className="text-sm text-gray-200">
            <p className="mb-2">
              <span className="font-medium">Total Todos:</span> {todos.length}
            </p>

            <div className="mb-2">
              <ToggleSwitch onToggle={onToggleDarkMode} />
            </div>

            <button
              className="bg-blue-600 w-full text-white px-4 py-2 rounded-md hover:bg-blue-500"
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  todos: PropTypes.array.isRequired,
  onToggleDarkMode: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default Navbar;

/* eslint-env jest */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';

// 1. Renders the Navbar with "Todo List" title
test('renders Navbar with Todo List title', () => {
  render(<App />);
  expect(screen.getByText(/Todo List/i)).toBeInTheDocument();
});

// 2. Renders the Dashboard section
test('renders Dashboard section', () => {
  render(<App />);
  expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
});

// 3. Renders the TodoForm input
test('renders TodoForm input', () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/Enter Task/i)).toBeInTheDocument();
});

// 4. Can type in the TodoForm input
test('can type in TodoForm input', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Enter Task/i);
  fireEvent.change(input, { target: { value: 'Test Task' } });
  expect(input.value).toBe('Test Task');
});

// 5. Renders the Add Todo button
test('renders Add Todo button', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /Add Todo/i })).toBeInTheDocument();
});
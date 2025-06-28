Noted! Since the backend consists of only `server.js`, I'll update the **Project Structure** section of the README to reflect this minimal backend setup. Here's the revised **README.md**:

```markdown
# To-Do Application (MERN Stack)

A simple and efficient To-Do app built with the MERN (MongoDB, Express.js, React.js, Node.js) stack. This app allows users to create, edit, delete, and mark tasks as complete. It includes features like priority levels, a dashboard, and a light/dark mode toggle.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Future Enhancements](#future-enhancements)
- [Author](#author)
- [License](#license)

## Project Overview

This To-Do app is designed to help users manage their daily tasks effectively. The app's backend is built with Node.js and Express.js, while the frontend is developed using React.js with Vite. MongoDB serves as the database for storing tasks.

## Features

- Add, update, and delete tasks
- Set priority levels for tasks (e.g., High, Medium, Low)
- Mark tasks as complete/incomplete
- Dashboard for task summary
- Light and dark mode for an optimal user experience

## Installation

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   ```
2. Navigate to the project directory:
   ```bash
   cd <repo-name>
   ```

3. Install backend dependencies:
   ```bash
   cd Backend
   npm install
   ```

4. Install frontend dependencies:
   ```bash
   cd ../Frontend
   npm install
   ```

5. Start the backend server:
   ```bash
   cd ../Backend
   node server.js
   ```

6. Start the frontend:
   ```bash
   cd ../Frontend
   npm run dev
   ```

7. Access the app in your browser at `http://localhost:5173`.

## Usage

- Navigate to the app's homepage.
- Add tasks with relevant details and priority levels.
- Edit or delete tasks as needed.
- Use the dashboard for an overview of task completion.

## Project Structure

```plaintext
To-Do-MERN-App/
│
├── Backend/
│   └── server.js        # Main backend server file
│
├── docker/
│   └── run cmds.txt     # Docker run commands
│
├── Frontend/
│   ├── node_modules/    # Frontend dependencies
│   ├── public/          # Public files (e.g., favicon, index.html)
│   ├── src/
│   │   ├── assets/      # Static assets
│   │   ├── Components/  # React components
│   │   ├── Layouts/     # Layout components
│   │   ├── App.jsx      # Main React App file
│   │   ├── main.jsx     # Entry point for React
│   └── vite.config.js   # Vite configuration
│
└── README.md            # Project documentation
```

## API Endpoints

| Method | Endpoint        | Description                  |
|--------|-----------------|------------------------------|
| GET    | `/api/tasks`    | Fetch all tasks             |
| POST   | `/api/tasks`    | Add a new task              |
| PUT    | `/api/tasks/:id`| Update an existing task     |
| DELETE | `/api/tasks/:id`| Delete a task               |

## Technologies Used

- **Frontend**: React.js, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **State Management**: React Hooks

## Future Enhancements

- User authentication and authorization
- Task filtering and sorting
- Integration with third-party APIs for notifications
- Mobile responsiveness

## Author

Created by [Kadhir](https://github.com/Kadhir812). Contributions and feedback are welcome!


If you have any specific adjustments or additions, let me know!

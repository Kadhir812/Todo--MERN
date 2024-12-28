# Use Node.js image
FROM node:20.11.0

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Expose port for Vite dev server
EXPOSE 5173

# Run Vite in development mode with hot-reloading
CMD ["npm", "run", "dev"]

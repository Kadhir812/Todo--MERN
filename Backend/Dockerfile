# Use Node.js image
FROM nodejs:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev # Install production dependencies only

# Copy all source code
COPY . .

# Expose port for Express server
EXPOSE 5050

# Run the application
CMD ["node", "server.js"]

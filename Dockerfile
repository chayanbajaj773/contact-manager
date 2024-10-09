# Stage 1: Build
FROM node:20-alpine3.19 AS build

# Create a work directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source files individually
COPY cache /app/cache
COPY middleware /app/middleware
COPY config /app/config
COPY controllers /app/controllers
COPY models /app/models
COPY routes /app/routes
COPY .env ./
COPY constants.js ./
COPY server.js ./

# Stage 2: Runtime
FROM node:20-alpine3.19

# Create a work directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app .

# Expose the application port (if needed)
EXPOSE 3000

# Run the application
CMD ["node", "server.js"]

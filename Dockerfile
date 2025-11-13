# Use the official Node.js image

FROM node:20-alpine

# Create app directory inside the container

WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for caching

COPY package*.json ./

# Install dependencies

RUN npm install

# Copy the rest of the application files

COPY . .

# Build the TypeScript project

RUN npm run build

# Expose port (you can change it)

EXPOSE 3000

# Define the command to start your app

CMD ["npm", "run", "start"]
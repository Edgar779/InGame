# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application's source code to the container
COPY . .

# Expose the port your NestJS application will run on
EXPOSE 3000

# Start your NestJS application
CMD ["npm", "start"]
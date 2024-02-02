# Use an official Node runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Install Python and other build dependencies
RUN apk --no-cache add python3 make g++

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

ENV TEMPORAL_CLUSTER_URL=http://service:3000

# Expose port 3001 to the outside world
EXPOSE 3001

# Run npm start when the container launches
CMD ["npm", "start"]
# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./package*.json ./

# Install app dependencies
RUN npm install 

# Copy the current directory contents into the container at /app
COPY . .

ENV TEMPORAL_CLUSTER_URL=temporal:7233

# Run npm start when the container launches
CMD ["npm", "run", "worker.watch"]
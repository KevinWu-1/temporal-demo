# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy only the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install
# CMD ["npm", "install", "--prefix", "./apps/widget"]

# Copy the rest of the application code
COPY . .

ENV TEMPORAL_CLUSTER_URL=temporal:7233

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "run", "service.watch"]

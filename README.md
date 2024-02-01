# Temporal Demo App

This is a sample application aimed to demonstrates how to leverage Temporal in a Typescript enviroment.

## Get Started

Install the ncecessary dependencies

```
# Install Docker (https://docs.docker.com/desktop/install/mac-install/)
# Install & Enable Kubernetes (https://docs.docker.com/desktop/kubernetes/)

# Make Docker for Mac your local Kubernetes cluster
kubectl config use-context docker-desktop

# Install Tilt for service orchistration and hot reload (https://docs.tilt.dev/install.html#macos)
curl -fsSL https://raw.githubusercontent.com/tilt-dev/tilt/master/scripts/install.sh | bash

# Install Temporal CLI for durable execution of workflows (https://docs.temporal.io/cli#install)
brew install temporal
```

## Running With Tilt (Recommended)

Tilt provides service orchistration as well as auto-refresh capabilities

```
# Install package dependencies
npm run install-all

# Dev: Run the following to run all services (Temporal Cluster, Temporal Worker, Widget UI, Express Backend)
tilt up

# Prod: Copies files as opposed to volume binding
tilt up -f Tiltfile.prod
```

## Running Locally

Run the following commands in the root directory of the project

```
# Install package dependencies
npm run install-all

# Start the Temporal Cluster
npm run temporal
# Run `npm run temporal-persist` for persistent workflows even when shutting down cluster

# Start the Temporal Worker
npm run worker

# Start the Express Server
npm run service

# Start the Widget UI
npm run widget
```

## About This Application

Here are the urls where you can interact with the application

- `http://localhost:3001/` - This page features the UI, presenting weather plugins. When clicked, attempts to log you in. Login status is then printed in the web console.
- `http://localhost:8233/` - This is where the Temporal UI is located. Detailed information on each Workflow and Activity that have been executed (or are being executed) can be found here
- `http://localhost:10350/` - This is the Tilt UI. It allows you to track and monitor each service that is running

Below are some information to get you familiar with this demo application and the file structure. Please refer to the diagram below for a tree-like format of the files.

- File Structure

  - All runnable services are located in the `apps` directory
    - This includes the Express server, UI Widget, and the Temporal Worker
  - Shared files are located in the `packages` directory
    - Contests of this directory have been extracted from the `apps` folder for easier access between multiple services

- Containerization & Orchistration

  - This application is set up so that each runnable service has it's own Dockerfile
  - Tilt is leverages as a orchistration tool and provides auto-refresh for updates
  - The dockerization of workers allow the number of workers to be easily scalable

- Temporal

  - Temporal brings the following
    - Durability - Workflow states are stored so that if a woker fails, state can be recovered by another worker to continue executing
      - This application, by default workflows and state will not persist after shutting down the Temporal cluster. Run `npm run temporal-persist` if you would like this functionality
    - Scalability - Temporal workflows and activities are loaded into queues for workers to process. Worker count can easily be increased for better performance
    - Elasticity. - Temporal workflows and activities can be assigned to specific task-queues. One can dynamically allocate resources by assiging more workers to specific queues

- Tilt

  - Tilt allows for automatic refresh of services if a file is changed or updated
  - There are two tilt files in the root directory
    - Tiltfile
      - This is the default tile file used for development. The binding of activity and workflow files will make it easier for developers to view updates in the services
      - To run this file: `tilt up`
    - Tiltfile.prod
      - This tiltfile should be used for production. Activity and workflow files are copied into the docker images, following best practices.
      - To run this file: `tilt up -f Tiltfile.prod`

```
.
├── apps
│   ├── server
│   │   └── src
│   ├── widget
│   │   ├── public
│   │   ├── src
│   │   │   └── components
│   │   └── widget
│   └── worker
│       └── src
└── packages
    ├── activities
    └── workflows
```

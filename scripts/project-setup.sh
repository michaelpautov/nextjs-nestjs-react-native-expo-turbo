#!/bin/bash

# Function to clean up the monorepo after creating a new branch
project_cleanup() {
    echo "Installing dependencies..."
    pnpm i &&
    echo "Cleaning up the monorepo..."
    pnpm run clean:workspaces &&
    pnpm run clean
}

# Function to build packages and install necessary dependencies
project_setup() {
    echo "Installing dependencies..."
    pnpm i &&
    echo "Building the necessary packages..."
    pnpm run build &&
    echo "Installing builds where needed..."
    pnpm i
}


run_setup() {
    # Running project preparation processes
    project_cleanup &&
    project_setup

    # Wait till backkground executions are finished
    wait

    echo "Project is ready for work."
#    echo "Try running 'make api'"
#    echo "To stop NATS Docker Containers, run 'make docker-down'"

}

# Initialising
run_setup

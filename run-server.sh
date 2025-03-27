#!/bin/bash

# Navigate to server directory
cd server

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Run the server
echo "Starting CareConnect server..."
npm run dev 
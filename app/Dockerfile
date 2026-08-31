FROM node:20-alpine

# Set the working directory inside the container.
WORKDIR /usr/src/app

# Copy package files first to take advantage of Docker's layer caching.
COPY package*.json ./

# Install project dependencies.
RUN npm install

# Expose the application port.
EXPOSE 3000

# Start the application in development mode.
# The development script is responsible for running the application
# with automatic reload support.
CMD ["npm", "run", "dev"]

#CMD ["npx", "ts-node-dev", "--poll", "--respawn", "--transpile-only", "src/index.ts"]

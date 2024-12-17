# syntax=docker/dockerfile:1

# Use a specific Node.js version
ARG NODE_VERSION=18

FROM node:${NODE_VERSION}-alpine

# Set production environment by default
ENV NODE_ENV=production

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm ci --omit=dev

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
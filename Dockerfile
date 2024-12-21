# Use a base Node.js image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code, including the certs folder
COPY . .

# Expose the HTTP and HTTPS ports defined in your .env file
EXPOSE 8765
EXPOSE 443

# Use the environment variables for configuration
ENV NODE_ENV=production

# Command to start the server
CMD ["node", "app.js"]

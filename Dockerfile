# Use Node.js Alpine image for lightweight deployment
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy website files
COPY . .

# Expose the port
EXPOSE $PORT

# Start command
CMD ["npm", "start"]
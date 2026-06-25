FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build the TypeScript project
RUN npm run build

# Expose port
EXPOSE 5000

# Start server
CMD ["npm", "start"]

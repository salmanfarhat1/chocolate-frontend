# frontend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy only necessary files for faster rebuilds
COPY package*.json ./

RUN npm install

COPY . .

# Expose dev port
EXPOSE 3001

# Run dev server on 0.0.0.0:3001
CMD ["npm", "run", "dev", "--", "-p", "3001", "-H", "0.0.0.0"]



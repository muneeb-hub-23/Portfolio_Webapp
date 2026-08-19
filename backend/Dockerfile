FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy application source
COPY . .

# Create upload directories
RUN mkdir -p uploads/profile uploads/projects uploads/skills

EXPOSE 5000

CMD ["node", "server.js"]

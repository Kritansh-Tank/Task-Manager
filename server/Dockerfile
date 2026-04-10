FROM node:18-alpine

WORKDIR /app

# Install dependencies first (cache layer)
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

# Create data directory
RUN mkdir -p data

EXPOSE 5000

CMD ["node", "index.js"]

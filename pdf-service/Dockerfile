# Use official Puppeteer image (includes Chrome deps)
FROM ghcr.io/puppeteer/puppeteer:22.6.4

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose PDF service port
EXPOSE 3001

# Run service
CMD ["node", "index.js"]

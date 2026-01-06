# Stage 1: Build Angular app
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source
COPY . .

# Build Angular app in production mode
RUN npm run build -- --configuration production

# Stage 2: Serve app with Nginx
FROM nginx:alpine

# Copy built Angular app from previous stage
COPY --from=build /app/dist/bibliotheque-front /usr/share/nginx/html

# Copy custom Nginx configuration (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

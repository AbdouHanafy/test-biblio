# -------------------------
# Backend Dockerfile (Chalice)
# -------------------------

# Use official Python slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements first for caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY . .

# Ensure __pycache__ exists (prevents Chalice filewatch error)
RUN mkdir -p /app/__pycache__

# Expose Chalice default local port
EXPOSE 8000

# Run Chalice local server on all interfaces without autoreload
CMD ["chalice", "local", "--host", "0.0.0.0", "--no-autoreload"]

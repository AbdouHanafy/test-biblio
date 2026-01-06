# Bibliothèque API

A full-stack library management system built with Angular and Python (Chalice). This application provides a RESTful API for managing books with JWT authentication and a modern Angular frontend.

## 🚀 Features

- **Book Management**: Create, read, update, and delete books
- **JWT Authentication**: Secure API endpoints with token-based authentication
- **RESTful API**: Clean and intuitive API design
- **Modern Frontend**: Angular 19 with responsive UI
- **Docker Support**: Easy deployment with Docker Compose
- **CORS Enabled**: Configured for cross-origin requests

## 🛠️ Tech Stack

### Backend
- **Python 3.11**
- **Chalice** - AWS serverless framework for building REST APIs
- **PyJWT** - JSON Web Token implementation
- **SQLAlchemy** - ORM for database operations (models defined, currently using in-memory storage)

### Frontend
- **Angular 19** - Modern web framework
- **TypeScript** - Type-safe JavaScript
- **RxJS** - Reactive programming

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Web server for frontend (production)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher) and npm
- **Python** (3.11 or higher) and pip
- **Docker** and **Docker Compose** (optional, for containerized deployment)

## 🏗️ Project Structure

```
bibliotheque-api/
├── bibliotheque/              # Backend API
│   ├── app.py                # Main Chalice application
│   ├── models.py             # SQLAlchemy models
│   ├── requirements.txt      # Python dependencies
│   ├── Dockerfile            # Backend container config
│   └── bibliotheque.db       # SQLite database (generated)
│
├── bibliotheque-front/        # Frontend Angular app
│   ├── src/
│   │   └── app/
│   │       ├── home.component.*
│   │       ├── library.component.*
│   │       └── services/
│   │           └── book.service.ts
│   ├── package.json
│   └── Dockerfile            # Frontend container config
│
└── docker-compose.yml        # Docker Compose configuration
```

## 🚀 Getting Started

### Option 1: Running with Docker (Recommended)

The easiest way to run the entire application:

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

The application will be available at:
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8000

To stop the services:
```bash
docker-compose down
```

### Option 2: Running Locally

#### Backend Setup

1. Navigate to the backend directory:
```bash
cd bibliotheque
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the Chalice local server:
```bash
chalice local --host 0.0.0.0
```

The backend API will be available at http://localhost:8000

#### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd bibliotheque-front
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be available at http://localhost:4200

## 📡 API Endpoints

### Public Endpoints

- `GET /public` - Public test endpoint (no authentication required)

### Protected Endpoints (Require JWT Token)

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-token>
```

- `GET /protected` - Protected test endpoint
- `POST /books` - Create a new book
  ```json
  {
    "title": "Book Title"
  }
  ```
- `GET /books` - List all books
- `PUT /books/{book_id}` - Update a book
  ```json
  {
    "title": "Updated Title"
  }
  ```
- `DELETE /books/{book_id}` - Delete a book

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Currently, the JWT secret key is set to a test value in `app.py`. 

**⚠️ Important**: For production, you should:
- Use a strong, randomly generated secret key
- Store secrets in environment variables
- Implement proper user authentication and token generation endpoints

### Current Configuration
- **Secret Key**: `"a-string-secret-at-least-256-bits-long"` (test only)
- **Algorithm**: HS256

## 🧪 Testing the API

You can test the API using tools like:
- **Postman**
- **cURL**
- **Thunder Client** (VS Code extension)
- The Angular frontend

### Example: Testing Public Endpoint
```bash
curl http://localhost:8000/public
```

### Example: Testing Protected Endpoint
```bash
curl -H "Authorization: Bearer <your-token>" http://localhost:8000/protected
```

## 🐳 Docker Details

### Backend Container
- Base image: `python:3.11-slim`
- Port: `8000`
- Runs Chalice local server

### Frontend Container
- Build stage: `node:20` (for building Angular app)
- Production stage: `nginx:alpine` (for serving static files)
- Port: `4200` (mapped to container port 80)

## 🔧 Development

### Backend Development

The backend uses Chalice, which provides:
- Automatic API Gateway integration (for AWS deployment)
- Local development server
- CORS configuration
- Request/response handling

### Frontend Development

The Angular app includes:
- Component-based architecture
- Service layer for API communication
- Routing configuration
- TypeScript for type safety

## 📝 Notes

- Currently, the book data is stored in-memory (in the `books` array). To persist data, you'll need to integrate the SQLAlchemy models defined in `models.py` with the API endpoints.
- The database file `bibliotheque.db` is created automatically when models are initialized.
- CORS is configured to allow requests from `http://localhost:4200`.

## 🚧 Future Improvements

- [ ] Implement database persistence using SQLAlchemy models
- [ ] Add user authentication and registration endpoints
- [ ] Implement proper token generation and refresh
- [ ] Add input validation and error handling
- [ ] Add unit and integration tests
- [ ] Deploy to AWS Lambda (Chalice native deployment)
- [ ] Add book search and filtering
- [ ] Implement pagination for book listings

## 📄 License

This project is open source and available for educational purposes.

## 👤 Author

Created as a learning project for full-stack development with Angular and Python.

---

**Happy Coding! 📚**


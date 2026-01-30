# Quick Start Guide - Backend

## Prerequisites
- Node.js installed
- MongoDB installed and running

## Setup Steps

### 1. Navigate to backend folder
```bash
cd backend
```

### 2. Dependencies (Already Installed)
```bash
npm install
```

### 3. Start MongoDB
Ensure MongoDB is running on your system at `mongodb://localhost:27017`

### 4. Start the Server

**Development Mode (with auto-restart):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

Expected Output:
```
MongoDB Connected: localhost
Server running in development mode on port 5000
```

### 5. Test the API

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

### 6. Load Sample Data (Optional)

```bash
npm run seed
```

This creates:
- **Admin**: admin@example.com / admin123
- **Student 1**: john@example.com / student123
- **Student 2**: jane@example.com / student123
- Sample exam with 4 questions

## API Base URL
```
http://localhost:5000/api
```

## Main Endpoints

### Authentication
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Exams (Admin)
- POST `/api/exams` - Create exam
- PUT `/api/exams/:id` - Update exam
- DELETE `/api/exams/:id` - Delete exam

### Exams (All Users)
- GET `/api/exams` - Get all exams
- GET `/api/exams/:id` - Get single exam

### Questions (Admin)
- POST `/api/exams/:examId/questions` - Add question
- PUT `/api/questions/:id` - Update question
- DELETE `/api/questions/:id` - Delete question

### Questions (All Users)
- GET `/api/exams/:examId/questions` - Get questions

### Results (Student)
- POST `/api/exams/:examId/submit` - Submit exam
- GET `/api/results` - Get my results
- GET `/api/exams/:examId/result` - Get specific result

### Results (Admin)
- GET `/api/results/all` - Get all results

## Testing Flow

1. **Register Admin**
```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Admin\",\"email\":\"admin@test.com\",\"password\":\"admin123\",\"role\":\"admin\"}"
```

2. **Login**
```bash
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@test.com\",\"password\":\"admin123\"}"
```

3. **Use the token from login response in subsequent requests**
```bash
Authorization: Bearer <your_token>
```

## Configuration

Edit `.env` file to change:
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT (change in production!)
- `JWT_EXPIRE` - Token expiration time (default: 7d)

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB service is running
- Check connection string in `.env`

**Port Already in Use:**
- Change PORT in `.env` file

**Authentication Errors:**
- Ensure token is included: `Authorization: Bearer <token>`
- Check token hasn't expired (7 days default)

## Next Steps

✅ Backend is ready!
- Test all endpoints
- Build React frontend
- Connect frontend to backend APIs

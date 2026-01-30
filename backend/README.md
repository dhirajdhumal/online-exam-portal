# Online Examination System - Backend

Backend API for Online Examination System built with Node.js, Express.js, and MongoDB.

## Features

- JWT-based authentication
- Role-based authorization (Admin & Student)
- Complete exam management (CRUD operations)
- Question management
- Auto result calculation
- Secure password hashing with bcrypt
- RESTful API design

## Tech Stack

- Node.js (Latest)
- Express.js v4.21.2
- MongoDB with Mongoose v8.9.5
- JWT for authentication
- bcryptjs for password hashing

## Installation

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file (already created):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/online_exam_system
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Start MongoDB service

5. Run the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user (Protected)

### Exams
- GET `/api/exams` - Get all active exams (Protected)
- GET `/api/exams/:id` - Get single exam (Protected)
- POST `/api/exams` - Create exam (Admin only)
- PUT `/api/exams/:id` - Update exam (Admin only)
- DELETE `/api/exams/:id` - Delete exam (Admin only)

### Questions
- GET `/api/exams/:examId/questions` - Get exam questions (Protected)
- POST `/api/exams/:examId/questions` - Add question (Admin only)
- PUT `/api/questions/:id` - Update question (Admin only)
- DELETE `/api/questions/:id` - Delete question (Admin only)

### Results
- POST `/api/exams/:examId/submit` - Submit exam (Student only)
- GET `/api/exams/:examId/result` - Get exam result (Student only)
- GET `/api/results` - Get my results (Student only)
- GET `/api/results/all` - Get all results (Admin only)

### Health Check
- GET `/api/health` - Server health check

## Seed Sample Data

```bash
# Import sample data
npm run seed

# Clear all data
npm run seed:destroy
```

Sample credentials after seeding:
- Admin: admin@example.com / admin123
- Student: john@example.com / student123

**📖 For detailed seeder documentation, see [SEEDER_GUIDE.md](SEEDER_GUIDE.md)**

## Project Structure

```
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── examController.js
│   ├── questionController.js
│   └── resultController.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── models/
│   ├── User.js
│   ├── Exam.js
│   ├── Question.js
│   └── Result.js
├── routes/
│   ├── authRoutes.js
│   ├── examRoutes.js
│   ├── questionRoutes.js
│   └── resultRoutes.js
├── utils/
│   └── generateToken.js
├── .env
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── seeder.js
└── server.js
```

## Testing with Postman

Import the `postman_collection.json` file into Postman for easy API testing.

**📖 For complete Postman testing guide, see [POSTMAN_GUIDE.md](POSTMAN_GUIDE.md)**

Quick steps:
1. Import `postman_collection.json` into Postman
2. Run seeder: `npm run seed`
3. Login as admin or student
4. Copy token from response
5. Use token in Authorization header for other requests

## Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- Protected routes with middleware
- Role-based access control
- Input validation
- Error handling

## Documentation

- **[README.md](README.md)** - Main documentation (this file)
- **[QUICK_START.md](QUICK_START.md)** - Quick setup guide
- **[POSTMAN_GUIDE.md](POSTMAN_GUIDE.md)** - Complete Postman testing guide
- **[SEEDER_GUIDE.md](SEEDER_GUIDE.md)** - Database seeder documentation
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Project structure details

## License

ISC

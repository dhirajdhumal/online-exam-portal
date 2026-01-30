# Backend Project Structure

```
backend/
├── config/
│   └── db.js                    # MongoDB connection configuration
│
├── controllers/
│   ├── authController.js        # Authentication logic (register, login, getMe)
│   ├── examController.js        # Exam CRUD operations
│   ├── questionController.js    # Question management
│   └── resultController.js      # Result calculation & retrieval
│
├── middleware/
│   ├── auth.js                  # JWT authentication & role authorization
│   └── errorHandler.js          # Global error handling middleware
│
├── models/
│   ├── User.js                  # User schema (Admin/Student roles)
│   ├── Exam.js                  # Exam schema
│   ├── Question.js              # Question schema (MCQ with 4 options)
│   └── Result.js                # Result schema with score calculation
│
├── routes/
│   ├── authRoutes.js            # Authentication endpoints
│   ├── examRoutes.js            # Exam management endpoints
│   ├── questionRoutes.js        # Question management endpoints
│   └── resultRoutes.js          # Result endpoints
│
├── utils/
│   └── generateToken.js         # JWT token generation utility
│
├── node_modules/                # Dependencies (auto-generated)
│
├── .env                         # Environment variables (configured)
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── package.json                 # Project dependencies and scripts
├── package-lock.json            # Locked dependency versions
├── server.js                    # Main application entry point
├── seeder.js                    # Sample data seeder script
├── README.md                    # Project documentation
├── QUICK_START.md              # Quick start guide
├── PROJECT_STRUCTURE.md        # This file
└── postman_collection.json     # Postman API collection
```

## Key Files Description

### Entry Point
- **server.js** - Main application file that:
  - Loads environment variables
  - Connects to MongoDB
  - Configures Express middleware
  - Mounts API routes
  - Starts the server
  - Handles errors

### Models (Database Schemas)
- **User.js** - User authentication and profile
  - Fields: name, email, password (hashed), role (admin/student)
  - Methods: comparePassword()
  - Pre-save hook for password hashing

- **Exam.js** - Exam information
  - Fields: title, description, duration, totalMarks, passingMarks, isActive, createdBy
  - References: User (createdBy)

- **Question.js** - Exam questions
  - Fields: examId, question, options (array of 4), correctAnswer (0-3), marks
  - References: Exam (examId)

- **Result.js** - Student exam results
  - Fields: studentId, examId, answers, score, totalMarks, percentage, passed
  - References: User (studentId), Exam (examId)
  - Unique index on (studentId, examId) to prevent duplicate submissions

### Controllers (Business Logic)
- **authController.js**
  - register() - Create new user account
  - login() - Authenticate user and return JWT
  - getMe() - Get current user profile

- **examController.js**
  - createExam() - Admin creates exam
  - getExams() - Get all active exams
  - getExam() - Get single exam details
  - updateExam() - Admin updates exam
  - deleteExam() - Admin deletes exam (cascade deletes questions)

- **questionController.js**
  - addQuestion() - Admin adds question to exam
  - getQuestions() - Get exam questions (hides answers for students)
  - updateQuestion() - Admin updates question
  - deleteQuestion() - Admin deletes question

- **resultController.js**
  - submitExam() - Student submits exam, auto-calculates score
  - getMyResults() - Student views their results
  - getResultByExam() - Student views specific exam result
  - getAllResults() - Admin views all results

### Middleware
- **auth.js**
  - protect() - Verifies JWT token
  - authorize(...roles) - Checks user role

- **errorHandler.js**
  - Global error handling
  - Mongoose error formatting
  - HTTP status code mapping

### Routes (API Endpoints)
All routes are prefixed with `/api`

- **authRoutes.js** - `/api/auth/*`
- **examRoutes.js** - `/api/exams/*`
- **questionRoutes.js** - `/api/questions/*`
- **resultRoutes.js** - `/api/results/*`

### Configuration
- **.env** - Environment variables (PORT, MONGODB_URI, JWT_SECRET, etc.)
- **package.json** - Dependencies and npm scripts

### Utilities
- **generateToken.js** - Creates JWT tokens with user ID

### Data Seeding
- **seeder.js** - Populates database with sample data
  - Creates admin and student users
  - Creates sample exam with questions
  - Run with: `npm run seed`

### Documentation
- **README.md** - Complete project documentation
- **QUICK_START.md** - Quick setup and testing guide
- **postman_collection.json** - Ready-to-use API collection

## Technology Stack

- **Runtime**: Node.js v22.13.1
- **Framework**: Express.js v4.21.2
- **Database**: MongoDB with Mongoose v8.9.5
- **Authentication**: JWT (jsonwebtoken v9.0.2)
- **Password Hashing**: bcryptjs v2.4.3
- **Validation**: express-validator v7.2.1
- **CORS**: cors v2.8.5
- **Environment**: dotenv v16.4.7
- **Dev Tool**: nodemon v3.1.9

## API Endpoints Summary

### Public Endpoints
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user

### Protected Endpoints (All Users)
- GET `/api/auth/me` - Get current user
- GET `/api/exams` - Get all exams
- GET `/api/exams/:id` - Get single exam
- GET `/api/exams/:examId/questions` - Get questions

### Admin Only Endpoints
- POST `/api/exams` - Create exam
- PUT `/api/exams/:id` - Update exam
- DELETE `/api/exams/:id` - Delete exam
- POST `/api/exams/:examId/questions` - Add question
- PUT `/api/questions/:id` - Update question
- DELETE `/api/questions/:id` - Delete question
- GET `/api/results/all` - Get all results

### Student Only Endpoints
- POST `/api/exams/:examId/submit` - Submit exam
- GET `/api/results` - Get my results
- GET `/api/exams/:examId/result` - Get specific result

## Security Features

1. **Password Security**
   - Bcrypt hashing with 10 salt rounds
   - Passwords never returned in API responses

2. **Authentication**
   - JWT token-based authentication
   - Token expiration (7 days default)
   - Token verification on protected routes

3. **Authorization**
   - Role-based access control
   - Admin and Student roles
   - Route-level permission checks

4. **Data Validation**
   - Input validation on all endpoints
   - Mongoose schema validation
   - Email format validation
   - Unique email constraint

5. **Error Handling**
   - Global error handler
   - Descriptive error messages
   - Proper HTTP status codes

## Database Collections

1. **users** - User accounts
2. **exams** - Exam definitions
3. **questions** - Exam questions
4. **results** - Student exam results

## Environment Variables

```env
PORT=5000                                    # Server port
MONGODB_URI=mongodb://localhost:27017/...   # MongoDB connection
JWT_SECRET=your_secret_key                   # JWT signing key
JWT_EXPIRE=7d                                # Token expiration
NODE_ENV=development                         # Environment mode
```

## NPM Scripts

```bash
npm start              # Start production server
npm run dev            # Start development server with nodemon
npm run seed           # Import sample data
npm run seed:destroy   # Clear all data
```

## Status

✅ Backend Complete and Ready for Production
✅ All Features Implemented
✅ Security Measures in Place
✅ Documentation Complete
✅ Ready for Frontend Integration

# Online Examination System - Complete Documentation

## Project Overview
A full-stack web-based application for conducting online exams, managing users, and evaluating results.

## Technology Stack
- **Frontend**: React.js, HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **PDF Generation**: jsPDF
- **Tools**: VS Code, Postman, Git

## User Roles
1. **Admin** - Can create/edit/delete exams, manage questions, view all results, manage users
2. **Student** - Can register, view available exams, attempt exams, view results

## Features Implemented

### ✅ Authentication & Authorization
- User registration (students only)
- Login with JWT token
- Role-based access control
- Password hashing with bcrypt
- Protected routes for admin and students

### ✅ Admin Features
- **Dashboard**: Overview with quick actions
- **Exam Management**: Create, update, delete exams
- **Question Management**: Add, edit, delete questions for each exam
- **User Management**: View all registered users
- **Results Management**: View all student results across all exams

### ✅ Student Features
- **Dashboard**: View available exams and attempted exams
- **Take Exam**: 
  - Timer with auto-submission on time completion
  - Visual warnings when time is running low
  - Question navigation
  - Answer selection
  - Submit confirmation
- **View Results**: 
  - Detailed result display
  - Performance analysis
  - PDF download with professional formatting
- **Profile Management**: 
  - Update personal information
  - Change password

### ✅ Exam Features
- Timed exams with countdown timer
- Auto-submission when time expires
- Prevent duplicate exam attempts
- Automatic result calculation
- Pass/Fail status based on passing marks

### ✅ Security Features
- JWT token-based authentication
- Password hashing using bcrypt
- Protected API routes
- Role-based authorization
- Secure password change functionality

### ✅ UI/UX Features
- Responsive design (mobile-friendly)
- Coolors palette (#1C1C1C, #DADDD8, #ECEBE4, #EEF0F2, #FAFAFF)
- Clean and modern interface
- Loading states
- Error handling and validation
- Success/error messages
- Smooth transitions and animations

## Project Structure

```
Online Examination System/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── examController.js
│   │   ├── questionController.js
│   │   ├── resultController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Exam.js
│   │   ├── Question.js
│   │   └── Result.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── examRoutes.js
│   │   ├── questionRoutes.js
│   │   ├── resultRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env
│   ├── package.json
│   ├── seeder.js
│   └── server.js
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   ├── StudentDashboard.jsx
    │   │   ├── TakeExam.jsx
    │   │   ├── ViewResult.jsx
    │   │   ├── ManageUsers.jsx
    │   │   ├── ManageQuestions.jsx
    │   │   ├── ViewAllResults.jsx
    │   │   └── StudentProfile.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── styles/
    │   │   ├── Login.css
    │   │   ├── Register.css
    │   │   ├── Navbar.css
    │   │   ├── AdminDashboard.css
    │   │   ├── StudentDashboard.css
    │   │   ├── TakeExam.css
    │   │   ├── ViewResult.css
    │   │   ├── ManageUsers.css
    │   │   ├── ManageQuestions.css
    │   │   ├── ViewAllResults.css
    │   │   └── StudentProfile.css
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## Database Schema

### User Collection
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (admin/student),
  standard: String,
  division: String,
  rollNo: String,
  phone: String,
  createdAt: Date
}
```

### Exam Collection
```javascript
{
  title: String (required),
  description: String (required),
  duration: Number (minutes, required),
  totalMarks: Number (required),
  passingMarks: Number (required),
  isActive: Boolean,
  createdBy: ObjectId (User),
  createdAt: Date
}
```

### Question Collection
```javascript
{
  examId: ObjectId (Exam, required),
  question: String (required),
  options: [String] (4 options, required),
  correctAnswer: Number (0-3, required),
  marks: Number (required),
  createdAt: Date
}
```

### Result Collection
```javascript
{
  studentId: ObjectId (User, required),
  examId: ObjectId (Exam, required),
  answers: [{
    questionId: ObjectId (Question),
    selectedAnswer: Number
  }],
  score: Number (required),
  totalMarks: Number (required),
  percentage: Number (required),
  passed: Boolean (required),
  submittedAt: Date
}
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new student
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/password` - Change password

### Exams
- `GET /api/exams` - Get all active exams
- `GET /api/exams/:id` - Get single exam
- `POST /api/exams` - Create exam (Admin)
- `PUT /api/exams/:id` - Update exam (Admin)
- `DELETE /api/exams/:id` - Delete exam (Admin)

### Questions
- `GET /api/questions/exam/:examId` - Get all questions for an exam
- `POST /api/questions` - Create question (Admin)
- `PUT /api/questions/:id` - Update question (Admin)
- `DELETE /api/questions/:id` - Delete question (Admin)

### Results
- `POST /api/results` - Submit exam answers
- `GET /api/results` - Get all results (Admin)
- `GET /api/results/my-results` - Get student's results
- `GET /api/results/exam/:examId` - Get result for specific exam

### Users
- `GET /api/users` - Get all users (Admin)

## Setup Instructions

### Backend Setup
1. Navigate to backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Create `.env` file with:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Run seeder (optional): `node seeder.js`
5. Start server: `npm run dev`

### Frontend Setup
1. Navigate to frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open browser at `http://localhost:5174`

## Test Credentials

### Admin Account
- Email: `admin@example.com`
- Password: `admin123`

### Student Accounts
- Email: `john@example.com` | Password: `student123`
- Email: `jane@example.com` | Password: `student123`

## Key Features Explained

### Timer Functionality
- Countdown timer displayed prominently
- Color changes based on remaining time (green → yellow → red)
- Auto-submission when timer reaches 0
- Timer persists across page (uses React state)

### Auto-Submission
- Automatically submits exam when time expires
- Shows alert to user before submission
- Prevents further answer changes
- Redirects to result page

### Result Calculation
- Automatic scoring based on correct answers
- Percentage calculation
- Pass/Fail determination
- Stores all answers for review

### PDF Generation
- Professional certificate-style layout
- Includes student information
- Exam details and performance metrics
- Uses Coolors palette for branding
- Downloadable with one click

### Duplicate Prevention
- Unique index on (studentId, examId) in Result model
- Checks for existing attempt before loading exam
- Redirects to result if already attempted

## Future Enhancements (Not Implemented)
- Question randomization
- Negative marking
- Certificate generation with signatures
- Proctoring system
- Email notifications
- Analytics dashboard
- Export results to Excel
- Question bank management
- Exam scheduling

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Edge
- Safari

## Responsive Design
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## Color Palette
- Dark: #1C1C1C
- Gray: #DADDD8
- Beige: #ECEBE4
- Light Gray: #EEF0F2
- White: #FAFAFF

## Notes
- All passwords are hashed using bcrypt
- JWT tokens expire based on configuration
- MongoDB connection required for backend
- Node.js v14+ required
- React 18+ used for frontend

## Support
For issues or questions, refer to the documentation in the `backend/documentation/` folder.

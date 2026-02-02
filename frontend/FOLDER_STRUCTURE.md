# Frontend Folder Structure

## Overview
The frontend has been restructured for better organization and maintainability.

## Directory Structure

```
frontend/src/
├── assets/              # Static assets (images, icons)
├── components/          # Reusable components
│   ├── Navbar.jsx
│   └── ProtectedRoute.jsx
├── context/             # React Context providers
│   └── AuthContext.jsx
├── pages/               # Page components organized by feature
│   ├── auth/           # Authentication pages
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── admin/          # Admin pages
│   │   ├── AdminDashboard.jsx
│   │   ├── ManageQuestions.jsx
│   │   ├── ManageUsers.jsx
│   │   └── ViewAllResults.jsx
│   ├── student/        # Student pages
│   │   ├── StudentDashboard.jsx
│   │   ├── StudentExams.jsx
│   │   ├── StudentProfile.jsx
│   │   └── StudentResults.jsx
│   └── exam/           # Exam-related pages
│       ├── TakeExam.jsx
│       └── ViewResult.jsx
├── services/            # API services
│   └── api.js
├── styles/              # CSS files organized by feature
│   ├── auth/
│   │   ├── Login.css
│   │   └── Register.css
│   ├── admin/
│   │   ├── AdminDashboard.css
│   │   ├── ManageQuestions.css
│   │   ├── ManageUsers.css
│   │   └── ViewAllResults.css
│   ├── student/
│   │   ├── StudentDashboard.css
│   │   └── StudentProfile.css
│   ├── exam/
│   │   ├── TakeExam.css
│   │   └── ViewResult.css
│   └── Navbar.css
├── App.jsx              # Main app component with routes
├── App.css
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## Benefits of This Structure

1. **Better Organization**: Pages are grouped by feature/role (auth, admin, student, exam)
2. **Easier Navigation**: Developers can quickly find related files
3. **Scalability**: Easy to add new features within their respective folders
4. **Maintainability**: Clear separation of concerns
5. **Consistent Imports**: All imports follow a predictable pattern

## Import Path Examples

### From auth pages (Login.jsx, Register.jsx):
```javascript
import { AuthContext } from '../../context/AuthContext';
import '../styles/auth/Login.css';
```

### From admin/student/exam pages:
```javascript
import Navbar from '../../components/Navbar';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import '../../styles/admin/AdminDashboard.css';
```

## Route Structure in App.jsx

- `/login` - Login page
- `/register` - Register page
- `/admin/dashboard` - Admin dashboard
- `/admin/users` - Manage users
- `/admin/exam/:examId/questions` - Manage questions
- `/admin/results` - View all results
- `/student/dashboard` - Student dashboard
- `/student/exams` - Browse exams
- `/student/results` - View results
- `/student/profile` - Student profile
- `/exam/:examId` - Take exam
- `/result/:examId` - View result

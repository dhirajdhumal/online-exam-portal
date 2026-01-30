# Database Seeder Guide - Online Examination System

## Table of Contents
1. [What is the Seeder?](#what-is-the-seeder)
2. [Quick Start](#quick-start)
3. [Seeder Commands](#seeder-commands)
4. [Sample Data Details](#sample-data-details)
5. [Customizing Seeder](#customizing-seeder)
6. [Troubleshooting](#troubleshooting)

---

## What is the Seeder?

The seeder is a script that populates your database with sample data for testing and development. It creates:
- User accounts (Admin and Students)
- Sample exams
- Sample questions
- Ready-to-test environment

**Benefits:**
- Quick setup for testing
- Consistent test data
- No manual data entry needed
- Easy database reset

---

## Quick Start

### Prerequisites
1. MongoDB must be running
2. Backend dependencies installed (`npm install`)
3. `.env` file configured

### Run Seeder

```bash
# Navigate to backend folder
cd backend

# Import sample data
npm run seed

# Or use node directly
node seeder.js
```

**Expected Output:**
```
MongoDB Connected
✅ Sample data imported successfully!

Created Users:
Admin - Email: admin@example.com, Password: admin123
Student 1 - Email: john@example.com, Password: student123
Student 2 - Email: jane@example.com, Password: student123

Created Exam: JavaScript Fundamentals (ID: 507f1f77bcf86cd799439011)
Created 4 questions for the exam
```

---

## Seeder Commands

### 1. Import Data (Seed Database)

```bash
npm run seed
```

**What it does:**
1. Connects to MongoDB
2. Clears existing data (users, exams, questions, results)
3. Creates new sample data
4. Displays created accounts and IDs
5. Exits automatically

**Use when:**
- First time setup
- Need fresh test data
- After database corruption
- Starting new testing session

### 2. Destroy Data (Clear Database)

```bash
npm run seed:destroy
```

**What it does:**
1. Connects to MongoDB
2. Deletes ALL data from:
   - Users collection
   - Exams collection
   - Questions collection
   - Results collection
3. Exits automatically

**Expected Output:**
```
MongoDB Connected
✅ Data destroyed successfully!
```

**Use when:**
- Need clean database
- Before production deployment
- Removing test data
- Database reset required

### 3. Direct Node Commands

```bash
# Import data
node seeder.js

# Destroy data
node seeder.js -d
```

---

## Sample Data Details

### Created Users

#### 1. Admin Account
```
Name: Admin User
Email: admin@example.com
Password: admin123
Role: admin
```

**Permissions:**
- Create, update, delete exams
- Add, edit, delete questions
- View all results
- Full system access

#### 2. Student Account 1
```
Name: John Doe
Email: john@example.com
Password: student123
Role: student
```

**Permissions:**
- View available exams
- Attempt exams
- View own results

#### 3. Student Account 2
```
Name: Jane Smith
Email: jane@example.com
Password: student123
Role: student
```

**Permissions:**
- Same as Student 1
- Useful for testing multiple students

### Created Exam

```json
{
  "title": "JavaScript Fundamentals",
  "description": "Test your knowledge of JavaScript basics",
  "duration": 60,
  "totalMarks": 20,
  "passingMarks": 12,
  "isActive": true,
  "createdBy": "<admin_id>"
}
```

**Exam Details:**
- Duration: 60 minutes
- Total Marks: 20 (4 questions × 5 marks each)
- Passing Marks: 12 (60% required to pass)
- Status: Active (visible to students)

### Created Questions

#### Question 1
```json
{
  "question": "What is JavaScript?",
  "options": [
    "A programming language",
    "A database",
    "An operating system",
    "A framework"
  ],
  "correctAnswer": 0,
  "marks": 5
}
```

#### Question 2
```json
{
  "question": "Which keyword is used to declare a variable in JavaScript?",
  "options": [
    "var",
    "int",
    "string",
    "variable"
  ],
  "correctAnswer": 0,
  "marks": 5
}
```

#### Question 3
```json
{
  "question": "What does DOM stand for?",
  "options": [
    "Document Object Model",
    "Data Object Model",
    "Digital Object Model",
    "Document Oriented Model"
  ],
  "correctAnswer": 0,
  "marks": 5
}
```

#### Question 4
```json
{
  "question": "Which method is used to parse a string to an integer?",
  "options": [
    "parseInt()",
    "parseFloat()",
    "Number()",
    "toInteger()"
  ],
  "correctAnswer": 0,
  "marks": 5
}
```

**All correct answers are option 0 (first option) for easy testing**

---

## Customizing Seeder

### Modify Sample Data

Edit `seeder.js` file to customize:

#### 1. Add More Users

```javascript
// Add after existing students
const student3 = await User.create({
  name: 'Alice Johnson',
  email: 'alice@example.com',
  password: 'student123',
  role: 'student'
});
```

#### 2. Create Additional Exams

```javascript
// Add after first exam
const exam2 = await Exam.create({
  title: 'React.js Basics',
  description: 'Test your React knowledge',
  duration: 45,
  totalMarks: 25,
  passingMarks: 15,
  isActive: true,
  createdBy: admin._id
});
```

#### 3. Add More Questions

```javascript
// Add to Question.insertMany array
{
  examId: exam._id,
  question: 'What is JSX?',
  options: [
    'JavaScript XML',
    'Java Syntax Extension',
    'JSON XML',
    'JavaScript Extension'
  ],
  correctAnswer: 0,
  marks: 5
}
```

#### 4. Change Passwords

```javascript
// Modify password field
const admin = await User.create({
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'your_custom_password',  // Change here
  role: 'admin'
});
```

#### 5. Adjust Exam Settings

```javascript
const exam = await Exam.create({
  title: 'JavaScript Fundamentals',
  description: 'Test your knowledge of JavaScript basics',
  duration: 90,           // Change duration
  totalMarks: 50,         // Change total marks
  passingMarks: 30,       // Change passing marks
  isActive: true,
  createdBy: admin._id
});
```

### Complete Custom Seeder Example

```javascript
// Add to seeder.js after existing code

// Create more diverse users
const users = await User.insertMany([
  {
    name: 'Teacher One',
    email: 'teacher1@example.com',
    password: 'teacher123',
    role: 'admin'
  },
  {
    name: 'Student Three',
    email: 'student3@example.com',
    password: 'student123',
    role: 'student'
  },
  {
    name: 'Student Four',
    email: 'student4@example.com',
    password: 'student123',
    role: 'student'
  }
]);

// Create multiple exams
const exams = await Exam.insertMany([
  {
    title: 'HTML & CSS Basics',
    description: 'Test your web design knowledge',
    duration: 30,
    totalMarks: 15,
    passingMarks: 9,
    isActive: true,
    createdBy: admin._id
  },
  {
    title: 'Node.js Fundamentals',
    description: 'Test your backend knowledge',
    duration: 60,
    totalMarks: 30,
    passingMarks: 18,
    isActive: true,
    createdBy: admin._id
  }
]);
```

---

## Seeder Workflow

### Development Workflow

```bash
# 1. Start fresh
npm run seed:destroy

# 2. Import sample data
npm run seed

# 3. Start server
npm run dev

# 4. Test with Postman or frontend

# 5. If data gets corrupted, repeat steps 1-2
```

### Testing Workflow

```bash
# Before each test session
npm run seed

# Run your tests
npm test

# Clean up after tests
npm run seed:destroy
```

### Production Workflow

```bash
# NEVER run seeder in production!
# Only use in development/testing

# Before deploying to production:
npm run seed:destroy  # Clear all test data
```

---

## Troubleshooting

### Issue 1: "MongoDB Connection Error"

**Error Message:**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
1. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # Mac/Linux
   sudo systemctl start mongod
   ```
2. Verify MongoDB is running:
   ```bash
   mongo --version
   ```
3. Check MONGODB_URI in `.env` file

### Issue 2: "Duplicate Key Error"

**Error Message:**
```
Error: E11000 duplicate key error collection
```

**Solution:**
1. Run destroy command first:
   ```bash
   npm run seed:destroy
   ```
2. Then run seed again:
   ```bash
   npm run seed
   ```

### Issue 3: "Cannot find module"

**Error Message:**
```
Error: Cannot find module './models/User.js'
```

**Solution:**
1. Ensure you're in backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Check file paths in seeder.js

### Issue 4: "Validation Error"

**Error Message:**
```
ValidationError: User validation failed
```

**Solution:**
1. Check model schemas match seeder data
2. Ensure all required fields are provided
3. Verify data types are correct

### Issue 5: Seeder Hangs/Doesn't Exit

**Cause:** Database connection not closing

**Solution:**
1. Press `Ctrl+C` to stop
2. Check seeder.js has `process.exit()` at end
3. Ensure no infinite loops in code

### Issue 6: "Permission Denied"

**Error Message:**
```
Error: EACCES: permission denied
```

**Solution:**
1. Run with appropriate permissions
2. Check file ownership
3. On Mac/Linux, may need sudo (not recommended)

---

## Best Practices

### 1. Always Destroy Before Seeding
```bash
npm run seed:destroy && npm run seed
```

### 2. Keep Seeder Updated
- Update seeder when models change
- Add new sample data for new features
- Keep passwords simple for testing

### 3. Document Custom Data
- Comment your custom seeder code
- Document test account credentials
- Note any special configurations

### 4. Version Control
- Commit seeder.js to repository
- Don't commit actual database files
- Share seeder with team members

### 5. Separate Production Data
- Never use seeder in production
- Use migrations for production data
- Keep test and production databases separate

---

## Advanced Usage

### Conditional Seeding

```javascript
// Only seed if database is empty
const userCount = await User.countDocuments();
if (userCount === 0) {
  // Run seeder
  console.log('Database empty, seeding...');
} else {
  console.log('Database has data, skipping seed');
  process.exit();
}
```

### Seeding with Relationships

```javascript
// Create exam with questions in one go
const exam = await Exam.create({...});

const questions = await Question.insertMany([
  { examId: exam._id, ... },
  { examId: exam._id, ... }
]);

console.log(`Created exam with ${questions.length} questions`);
```

### Random Data Generation

```javascript
// Use faker for realistic data
import { faker } from '@faker-js/faker';

const students = [];
for (let i = 0; i < 10; i++) {
  students.push({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: 'student123',
    role: 'student'
  });
}

await User.insertMany(students);
```

---

## Seeder Checklist

Before running seeder:
- [ ] MongoDB is running
- [ ] Backend dependencies installed
- [ ] .env file configured
- [ ] In correct directory (backend/)

After running seeder:
- [ ] Check console output for success
- [ ] Note down created IDs
- [ ] Save credentials for testing
- [ ] Verify data in MongoDB

---

## Quick Reference

| Command | Action | Use Case |
|---------|--------|----------|
| `npm run seed` | Import sample data | First setup, fresh start |
| `npm run seed:destroy` | Clear all data | Clean database, reset |
| `node seeder.js` | Import data (direct) | Same as npm run seed |
| `node seeder.js -d` | Destroy data (direct) | Same as npm run seed:destroy |

---

## Sample Credentials Summary

| Role | Email | Password | Purpose |
|------|-------|----------|---------|
| Admin | admin@example.com | admin123 | Full system access |
| Student | john@example.com | student123 | Testing student features |
| Student | jane@example.com | student123 | Multiple student testing |

---

## Support

For seeder issues:
1. Check MongoDB connection
2. Verify .env configuration
3. Review console error messages
4. Check model schemas
5. Ensure dependencies installed

For custom seeder help:
- Review seeder.js comments
- Check model documentation
- Test changes incrementally
- Keep backup of working seeder

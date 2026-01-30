# Postman Testing Guide - Online Examination System

## Table of Contents
1. [Setup Postman](#setup-postman)
2. [Import Collection](#import-collection)
3. [Environment Variables](#environment-variables)
4. [Testing Workflow](#testing-workflow)
5. [API Endpoints Reference](#api-endpoints-reference)
6. [Common Issues](#common-issues)

---

## Setup Postman

### 1. Install Postman
- Download from: https://www.postman.com/downloads/
- Install and create a free account (optional)

### 2. Import Collection
1. Open Postman
2. Click **Import** button (top left)
3. Select **File** tab
4. Choose `postman_collection.json` from backend folder
5. Click **Import**

You should now see "Online Examination System API" in your Collections

---

## Environment Variables

### Create Environment (Recommended)

1. Click **Environments** (left sidebar)
2. Click **+** to create new environment
3. Name it: `Online Exam - Local`
4. Add variables:

| Variable | Initial Value | Current Value |
|----------|--------------|---------------|
| baseUrl | http://localhost:5000/api | http://localhost:5000/api |
| token | (leave empty) | (will be set automatically) |
| examId | (leave empty) | (will be set manually) |
| questionId | (leave empty) | (will be set manually) |

5. Click **Save**
6. Select this environment from dropdown (top right)

### Manual Token Management

If not using environment variables, you'll need to:
1. Copy token from login response
2. Paste it in Authorization header: `Bearer <token>`

---

## Testing Workflow

### Complete Testing Flow

#### Phase 1: Setup (Run Seeder First)
```bash
cd backend
npm run seed
```

This creates:
- Admin: admin@example.com / admin123
- Student: john@example.com / student123
- Sample exam with 4 questions

#### Phase 2: Authentication Testing

**Step 1: Login as Admin**
1. Open **Auth** → **Login**
2. Body should have:
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```
3. Click **Send**
4. Copy the `token` from response
5. Save it in environment variable or use for next requests

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Step 2: Test Get Current User**
1. Open **Auth** → **Get Me**
2. Add Authorization header: `Bearer <your_token>`
3. Click **Send**

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin",
    "createdAt": "..."
  }
}
```

#### Phase 3: Exam Management (Admin)

**Step 3: Get All Exams**
1. Open **Exams** → **Get All Exams**
2. Add Authorization header
3. Click **Send**
4. **Copy the exam `_id`** from response for next steps

**Step 4: Get Single Exam**
1. Open **Exams** → **Get Exam**
2. Replace `{{examId}}` in URL with actual exam ID
3. Add Authorization header
4. Click **Send**

**Step 5: Create New Exam**
1. Open **Exams** → **Create Exam**
2. Body:
```json
{
  "title": "React.js Fundamentals",
  "description": "Test your React knowledge",
  "duration": 45,
  "totalMarks": 50,
  "passingMarks": 25
}
```
3. Add Authorization header (admin token)
4. Click **Send**
5. **Copy the new exam `_id`**

**Step 6: Update Exam**
1. Open **Exams** → **Update Exam**
2. Replace `{{examId}}` with exam ID
3. Body (update any field):
```json
{
  "title": "React.js Advanced",
  "duration": 60
}
```
4. Add Authorization header
5. Click **Send**

#### Phase 4: Question Management (Admin)

**Step 7: Get Questions for Exam**
1. Open **Questions** → **Get Questions**
2. Replace `{{examId}}` in URL
3. Add Authorization header
4. Click **Send**
5. **Copy a question `_id`** for next steps

**Step 8: Add New Question**
1. Open **Questions** → **Add Question**
2. Replace `{{examId}}` in URL
3. Body:
```json
{
  "question": "What is React?",
  "options": [
    "A JavaScript library",
    "A database",
    "An operating system",
    "A programming language"
  ],
  "correctAnswer": 0,
  "marks": 5
}
```
4. Add Authorization header (admin token)
5. Click **Send**

**Step 9: Update Question**
1. Open **Questions** → **Update Question**
2. Replace `{{questionId}}` in URL
3. Body:
```json
{
  "marks": 10,
  "question": "What is React used for?"
}
```
4. Add Authorization header
5. Click **Send**

**Step 10: Delete Question**
1. Open **Questions** → **Delete Question**
2. Replace `{{questionId}}` in URL
3. Add Authorization header
4. Click **Send**

#### Phase 5: Student Testing

**Step 11: Login as Student**
1. Open **Auth** → **Login**
2. Body:
```json
{
  "email": "john@example.com",
  "password": "student123"
}
```
3. Click **Send**
4. **Copy the student token** (different from admin token)

**Step 12: View Available Exams**
1. Open **Exams** → **Get All Exams**
2. Add Authorization header (student token)
3. Click **Send**
4. Note the exam IDs available

**Step 13: View Exam Questions**
1. Open **Questions** → **Get Questions**
2. Replace `{{examId}}` in URL
3. Add Authorization header (student token)
4. Click **Send**
5. **Note: Correct answers are hidden for students**
6. **Copy all question IDs** for submission

**Step 14: Submit Exam**
1. Open **Results** → **Submit Exam**
2. Replace `{{examId}}` in URL
3. Body (use actual question IDs):
```json
{
  "answers": [
    {
      "questionId": "actual_question_id_1",
      "selectedAnswer": 0
    },
    {
      "questionId": "actual_question_id_2",
      "selectedAnswer": 1
    },
    {
      "questionId": "actual_question_id_3",
      "selectedAnswer": 0
    },
    {
      "questionId": "actual_question_id_4",
      "selectedAnswer": 0
    }
  ]
}
```
4. Add Authorization header (student token)
5. Click **Send**

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "studentId": "...",
    "examId": "...",
    "answers": [...],
    "score": 15,
    "totalMarks": 20,
    "percentage": 75,
    "passed": true,
    "submittedAt": "..."
  }
}
```

**Step 15: View My Results**
1. Open **Results** → **Get My Results**
2. Add Authorization header (student token)
3. Click **Send**

**Step 16: View Specific Result**
1. Open **Results** → **Get Result by Exam**
2. Replace `{{examId}}` in URL
3. Add Authorization header (student token)
4. Click **Send**

#### Phase 6: Admin Result Management

**Step 17: View All Results (Admin)**
1. Open **Results** → **Get All Results (Admin)**
2. Add Authorization header (admin token)
3. Click **Send**
4. See all student results across all exams

---

## API Endpoints Reference

### Authentication Endpoints

#### 1. Register User
- **Method:** POST
- **URL:** `http://localhost:5000/api/auth/register`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "role": "student"
}
```
- **Response:** User object with token

#### 2. Login
- **Method:** POST
- **URL:** `http://localhost:5000/api/auth/login`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```
- **Response:** User object with token

#### 3. Get Current User
- **Method:** GET
- **URL:** `http://localhost:5000/api/auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Current user details

### Exam Endpoints

#### 4. Get All Exams
- **Method:** GET
- **URL:** `http://localhost:5000/api/exams`
- **Headers:** `Authorization: Bearer <token>`
- **Access:** All authenticated users

#### 5. Get Single Exam
- **Method:** GET
- **URL:** `http://localhost:5000/api/exams/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Access:** All authenticated users

#### 6. Create Exam
- **Method:** POST
- **URL:** `http://localhost:5000/api/exams`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer <admin_token>`
- **Body:**
```json
{
  "title": "Exam Title",
  "description": "Exam Description",
  "duration": 60,
  "totalMarks": 100,
  "passingMarks": 40
}
```
- **Access:** Admin only

#### 7. Update Exam
- **Method:** PUT
- **URL:** `http://localhost:5000/api/exams/:id`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer <admin_token>`
- **Body:** Fields to update
- **Access:** Admin only

#### 8. Delete Exam
- **Method:** DELETE
- **URL:** `http://localhost:5000/api/exams/:id`
- **Headers:** `Authorization: Bearer <admin_token>`
- **Access:** Admin only
- **Note:** Also deletes all associated questions

### Question Endpoints

#### 9. Get Questions
- **Method:** GET
- **URL:** `http://localhost:5000/api/exams/:examId/questions`
- **Headers:** `Authorization: Bearer <token>`
- **Access:** All authenticated users
- **Note:** Students don't see correct answers

#### 10. Add Question
- **Method:** POST
- **URL:** `http://localhost:5000/api/exams/:examId/questions`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer <admin_token>`
- **Body:**
```json
{
  "question": "Question text?",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "correctAnswer": 0,
  "marks": 5
}
```
- **Access:** Admin only

#### 11. Update Question
- **Method:** PUT
- **URL:** `http://localhost:5000/api/questions/:id`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer <admin_token>`
- **Body:** Fields to update
- **Access:** Admin only

#### 12. Delete Question
- **Method:** DELETE
- **URL:** `http://localhost:5000/api/questions/:id`
- **Headers:** `Authorization: Bearer <admin_token>`
- **Access:** Admin only

### Result Endpoints

#### 13. Submit Exam
- **Method:** POST
- **URL:** `http://localhost:5000/api/exams/:examId/submit`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer <student_token>`
- **Body:**
```json
{
  "answers": [
    {"questionId": "id1", "selectedAnswer": 0},
    {"questionId": "id2", "selectedAnswer": 2}
  ]
}
```
- **Access:** Student only
- **Note:** Can only submit once per exam

#### 14. Get My Results
- **Method:** GET
- **URL:** `http://localhost:5000/api/results`
- **Headers:** `Authorization: Bearer <student_token>`
- **Access:** Student only

#### 15. Get Result by Exam
- **Method:** GET
- **URL:** `http://localhost:5000/api/exams/:examId/result`
- **Headers:** `Authorization: Bearer <student_token>`
- **Access:** Student only

#### 16. Get All Results
- **Method:** GET
- **URL:** `http://localhost:5000/api/results/all`
- **Headers:** `Authorization: Bearer <admin_token>`
- **Access:** Admin only

---

## Common Issues

### Issue 1: "Not authorized to access this route"
**Cause:** Missing or invalid token
**Solution:**
1. Login again to get fresh token
2. Ensure Authorization header format: `Bearer <token>`
3. Check token hasn't expired (7 days default)

### Issue 2: "User role student is not authorized"
**Cause:** Using student token for admin-only endpoint
**Solution:**
1. Login as admin
2. Use admin token for admin endpoints

### Issue 3: "You have already submitted this exam"
**Cause:** Trying to submit same exam twice
**Solution:**
1. Each student can only submit an exam once
2. Use different student account or different exam

### Issue 4: "Exam not found"
**Cause:** Invalid exam ID in URL
**Solution:**
1. Get valid exam ID from "Get All Exams" endpoint
2. Ensure you're using the correct `_id` field

### Issue 5: "Duplicate field value entered"
**Cause:** Email already exists during registration
**Solution:**
1. Use different email address
2. Or login with existing credentials

### Issue 6: Connection refused
**Cause:** Server not running
**Solution:**
```bash
cd backend
npm run dev
```

### Issue 7: MongoDB connection error
**Cause:** MongoDB not running
**Solution:**
1. Start MongoDB service
2. Check MONGODB_URI in .env file

---

## Tips for Efficient Testing

### 1. Use Environment Variables
- Set `{{baseUrl}}` = `http://localhost:5000/api`
- Set `{{token}}` after login
- Update `{{examId}}` and `{{questionId}}` as needed

### 2. Save Responses
- Use Postman's "Save Response" feature
- Keep track of IDs for testing

### 3. Use Collections Runner
- Run entire collection automatically
- Set up test scripts for automation

### 4. Test Scripts Example
Add to Tests tab in Postman:
```javascript
// Auto-save token after login
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    if (jsonData.data.token) {
        pm.environment.set("token", jsonData.data.token);
    }
}
```

### 5. Pre-request Scripts
Add to Pre-request Script tab:
```javascript
// Auto-add authorization header
pm.request.headers.add({
    key: 'Authorization',
    value: 'Bearer ' + pm.environment.get('token')
});
```

---

## Testing Checklist

- [ ] Server is running (`npm run dev`)
- [ ] MongoDB is running
- [ ] Seeder data loaded (`npm run seed`)
- [ ] Postman collection imported
- [ ] Environment variables configured
- [ ] Admin login successful
- [ ] Student login successful
- [ ] All exam endpoints tested
- [ ] All question endpoints tested
- [ ] Exam submission tested
- [ ] Results viewing tested
- [ ] Authorization working correctly
- [ ] Error handling verified

---

## Support

For issues or questions:
1. Check server logs in terminal
2. Verify MongoDB connection
3. Ensure all dependencies installed
4. Check .env configuration
5. Review API documentation in README.md

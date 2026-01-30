# 🚀 START HERE - Online Examination System Backend

## Welcome! 👋

This is your starting point for the Online Examination System backend. Follow this guide to get up and running in **under 10 minutes**.

---

## ⚡ Super Quick Start (5 Minutes)

```bash
# 1. Navigate to backend folder
cd backend

# 2. Install dependencies (if not already done)
npm install

# 3. Start MongoDB (ensure it's running)

# 4. Start the server
npm run dev

# 5. Load sample data (in another terminal)
npm run seed

# 6. Test the API
# Open Postman and import postman_collection.json
# Or use: curl http://localhost:5000/api/health
```

**✅ Done! Your backend is running on http://localhost:5000**

---

## 📖 What's Next?

### Choose Your Path:

#### 🧪 I Want to Test the API
→ **[POSTMAN_GUIDE.md](POSTMAN_GUIDE.md)**
- Complete Postman setup
- Test all 16 endpoints
- Sample requests & responses

#### 🗄️ I Need Sample Data
→ **[SEEDER_GUIDE.md](SEEDER_GUIDE.md)**
- Load test data
- User credentials
- Customize seeder

#### 🏗️ I Want to Understand the Code
→ **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)**
- Architecture overview
- File organization
- Model schemas

#### 📚 I Want Complete Documentation
→ **[DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)**
- All documentation links
- Learning paths
- Quick references

#### 🔧 I Need Setup Help
→ **[QUICK_START.md](QUICK_START.md)**
- Detailed setup steps
- Configuration guide
- Troubleshooting

---

## 🎯 Quick Reference

### Sample Credentials (After Seeding)

```
Admin:
  Email: admin@example.com
  Password: admin123

Student:
  Email: john@example.com
  Password: student123
```

### Essential Commands

```bash
npm run dev              # Start development server
npm run seed             # Load sample data
npm run seed:destroy     # Clear database
npm start                # Production server
```

### API Base URL

```
http://localhost:5000/api
```

### Test Endpoint

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## 📁 Documentation Files

| File | Purpose | When to Read |
|------|---------|--------------|
| **[START_HERE.md](START_HERE.md)** | This file - Quick start | First! |
| **[README.md](README.md)** | Main documentation | Overview needed |
| **[QUICK_START.md](QUICK_START.md)** | Setup guide | Detailed setup |
| **[POSTMAN_GUIDE.md](POSTMAN_GUIDE.md)** | API testing | Testing APIs |
| **[SEEDER_GUIDE.md](SEEDER_GUIDE.md)** | Database seeder | Need test data |
| **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** | Code structure | Understanding code |
| **[DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)** | All docs index | Finding docs |

---

## ✅ Setup Checklist

- [ ] Node.js installed (v22.13.1 or higher)
- [ ] MongoDB installed and running
- [ ] Backend folder opened in terminal
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file exists (already created)
- [ ] Server starts successfully (`npm run dev`)
- [ ] Sample data loaded (`npm run seed`)
- [ ] Health check passes
- [ ] Postman collection imported

---

## 🎓 5-Minute Tutorial

### Step 1: Start the Server (1 min)

```bash
cd backend
npm run dev
```

You should see:
```
MongoDB Connected: localhost
Server running in development mode on port 5000
```

### Step 2: Load Sample Data (1 min)

Open a new terminal:
```bash
cd backend
npm run seed
```

You should see:
```
✅ Sample data imported successfully!
Created Users:
Admin - Email: admin@example.com, Password: admin123
Student 1 - Email: john@example.com, Password: student123
```

### Step 3: Test Login (3 min)

**Option A: Using curl**
```bash
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@example.com\",\"password\":\"admin123\"}"
```

**Option B: Using Postman**
1. Import `postman_collection.json`
2. Open **Auth** → **Login**
3. Click **Send**
4. Copy the token from response

**Success!** You now have a working backend with authentication.

---

## 🔥 Common First-Time Issues

### Issue: "Cannot connect to MongoDB"
**Solution:**
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

### Issue: "Port 5000 already in use"
**Solution:**
Edit `.env` file:
```
PORT=5001
```

### Issue: "Module not found"
**Solution:**
```bash
npm install
```

### Issue: "Seeder fails"
**Solution:**
```bash
npm run seed:destroy
npm run seed
```

---

## 🎯 What This Backend Does

### Features Implemented ✅

1. **Authentication**
   - User registration
   - Login with JWT
   - Password hashing

2. **User Roles**
   - Admin (full access)
   - Student (limited access)

3. **Exam Management**
   - Create, read, update, delete exams
   - Set duration, marks, passing criteria

4. **Question Management**
   - Add questions to exams
   - Multiple choice (4 options)
   - Configurable marks

5. **Result System**
   - Automatic score calculation
   - Pass/fail determination
   - Result history

6. **Security**
   - JWT authentication
   - Role-based authorization
   - Password encryption
   - Protected routes

---

## 📊 Project Stats

- **API Endpoints:** 16
- **Models:** 4 (User, Exam, Question, Result)
- **Controllers:** 4
- **Middleware:** 2
- **Routes:** 4
- **Documentation Pages:** 7
- **Lines of Code:** ~1,500+

---

## 🚀 Technology Stack

- **Runtime:** Node.js v22.13.1
- **Framework:** Express.js v4.21.2
- **Database:** MongoDB with Mongoose v8.9.5
- **Authentication:** JWT v9.0.2
- **Password:** bcryptjs v2.4.3
- **Validation:** express-validator v7.2.1
- **CORS:** cors v2.8.5

All using the **latest versions**!

---

## 🎬 Next Actions

### For Testing:
1. ✅ Server running
2. ✅ Data seeded
3. → Open [POSTMAN_GUIDE.md](POSTMAN_GUIDE.md)
4. → Test all endpoints

### For Development:
1. ✅ Server running
2. → Read [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
3. → Review model files
4. → Start coding

### For Integration:
1. ✅ Backend ready
2. → Review API endpoints in [README.md](README.md)
3. → Build frontend
4. → Connect to APIs

---

## 💡 Pro Tips

1. **Keep server running** in one terminal
2. **Use Postman** for quick API testing
3. **Run seeder** when you need fresh data
4. **Check logs** in terminal for errors
5. **Read docs** before asking questions

---

## 🆘 Need Help?

### Quick Fixes
1. Restart server: `Ctrl+C` then `npm run dev`
2. Reset database: `npm run seed:destroy && npm run seed`
3. Check MongoDB: Ensure it's running
4. Verify .env: Check configuration

### Documentation
- Setup issues → [QUICK_START.md](QUICK_START.md)
- API testing → [POSTMAN_GUIDE.md](POSTMAN_GUIDE.md)
- Database → [SEEDER_GUIDE.md](SEEDER_GUIDE.md)
- Code help → [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

---

## 🎉 You're Ready!

Your backend is now:
- ✅ Installed
- ✅ Configured
- ✅ Running
- ✅ Tested
- ✅ Documented

**Time to build something amazing! 🚀**

---

## 📞 Quick Links

- **Main Docs:** [README.md](README.md)
- **Setup Guide:** [QUICK_START.md](QUICK_START.md)
- **API Testing:** [POSTMAN_GUIDE.md](POSTMAN_GUIDE.md)
- **Sample Data:** [SEEDER_GUIDE.md](SEEDER_GUIDE.md)
- **Architecture:** [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
- **All Docs:** [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)

---

**Happy Coding! 🎯**

*Last Updated: January 2026*

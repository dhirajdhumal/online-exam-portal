import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageExams from './pages/admin/ManageExams';
import ManageUsers from './pages/admin/ManageUsers';
import ManageQuestions from './pages/admin/ManageQuestions';
import ViewAllResults from './pages/admin/ViewAllResults';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentExams from './pages/student/StudentExams';
import StudentResults from './pages/student/StudentResults';
import StudentProfile from './pages/student/StudentProfile';
import TakeExam from './pages/exam/TakeExam';
import ViewResult from './pages/exam/ViewResult';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/exam/create" element={
            <ProtectedRoute role="admin">
              <ManageExams />
            </ProtectedRoute>
          } />
          <Route path="/admin/exam/edit/:examId" element={
            <ProtectedRoute role="admin">
              <ManageExams />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute role="admin">
              <ManageUsers />
            </ProtectedRoute>
          } />
          <Route path="/admin/exam/:examId/questions" element={
            <ProtectedRoute role="admin">
              <ManageQuestions />
            </ProtectedRoute>
          } />
          <Route path="/admin/results" element={
            <ProtectedRoute role="admin">
              <ViewAllResults />
            </ProtectedRoute>
          } />
          
          {/* Student Routes */}
          <Route path="/student/dashboard" element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/student/exams" element={
            <ProtectedRoute role="student">
              <StudentExams />
            </ProtectedRoute>
          } />
          <Route path="/student/results" element={
            <ProtectedRoute role="student">
              <StudentResults />
            </ProtectedRoute>
          } />
          <Route path="/student/profile" element={
            <ProtectedRoute role="student">
              <StudentProfile />
            </ProtectedRoute>
          } />
          <Route path="/exam/:examId" element={
            <ProtectedRoute role="student">
              <TakeExam />
            </ProtectedRoute>
          } />
          <Route path="/result/:examId" element={
            <ProtectedRoute role="student">
              <ViewResult />
            </ProtectedRoute>
          } />
          
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

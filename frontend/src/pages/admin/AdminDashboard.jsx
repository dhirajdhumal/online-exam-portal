import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import api from '../../services/api';
import '../../styles/admin/AdminDashboard.css';

const AdminDashboard = () => {
  const [exams, setExams] = useState([]);
  const [stats, setStats] = useState({
    totalExams: 0,
    totalStudents: 0,
    totalResults: 0,
    activeExams: 0
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [examsRes, usersRes, resultsRes] = await Promise.all([
        api.get('/exams'),
        api.get('/users'),
        api.get('/results/all')
      ]);

      const examsData = examsRes.data.data;
      const usersData = usersRes.data.data;
      const resultsData = resultsRes.data.data;

      setExams(examsData);
      setStats({
        totalExams: examsData.length,
        totalStudents: usersData.filter(u => u.role === 'student').length,
        totalResults: resultsData.length,
        activeExams: examsData.filter(e => e.isActive).length
      });
    } catch (err) {
      setError('Failed to load dashboard data');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDelete = async (examId) => {
    if (!window.confirm('Are you sure you want to delete this exam? All questions and results will also be deleted.')) {
      return;
    }

    try {
      setError('');
      setSuccess('');
      await api.delete(`/exams/${examId}`);
      setSuccess('Exam deleted successfully!');
      fetchDashboardData();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete exam');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleManageQuestions = (examId) => {
    navigate(`/admin/exam/${examId}/questions`);
  };

  const handleEditExam = (examId) => {
    navigate(`/admin/exam/edit/${examId}`);
  };

  return (
    <div>
      <Navbar title="Admin Dashboard" />
      
      {/* Toast Notifications */}
      {success && <div className="toast-success">{success}</div>}
      {error && <div className="toast-error">{error}</div>}
      
      <div className="admin-container">
        <div className="admin-header">
          <h1>Welcome, {user?.name}!</h1>
          <p>Manage your online examination system</p>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-content">
              <div className="stat-value">{stats.totalExams}</div>
              <div className="stat-label">Total Exams</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👨‍🎓</div>
            <div className="stat-content">
              <div className="stat-value">{stats.totalStudents}</div>
              <div className="stat-label">Students</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-value">{stats.activeExams}</div>
              <div className="stat-label">Active Exams</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-value">{stats.totalResults}</div>
              <div className="stat-label">Results</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h2>Quick Actions</h2>
          <div className="admin-actions">
            <div className="action-card" onClick={() => navigate('/admin/exam/create')}>
              <div className="action-icon">➕</div>
              <h3>Create Exam</h3>
              <p>Add a new examination</p>
            </div>
            <div className="action-card" onClick={() => navigate('/admin/users')}>
              <div className="action-icon">👥</div>
              <h3>Manage Users</h3>
              <p>View and manage accounts</p>
            </div>
            <div className="action-card" onClick={() => navigate('/admin/results')}>
              <div className="action-icon">📈</div>
              <h3>View Results</h3>
              <p>Check student performance</p>
            </div>
          </div>
        </div>

        {/* Exams Table */}
        <div className="exams-section">
          <div className="section-header">
            <h2>All Exams</h2>
            <button onClick={() => navigate('/admin/exam/create')} className="btn-create">
              + Create Exam
            </button>
          </div>

          {exams.length === 0 ? (
            <div className="no-data-card">
              <div className="no-data-icon">📝</div>
              <h3>No exams created yet</h3>
              <p>Get started by creating your first exam</p>
              <button onClick={() => navigate('/admin/exam/create')} className="btn-primary">
                Create Your First Exam
              </button>
            </div>
          ) : (
            <table className="exams-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Duration</th>
                  <th>Total Marks</th>
                  <th>Passing Marks</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam) => (
                  <tr key={exam._id}>
                    <td>
                      <div className="exam-title-cell">
                        <strong>{exam.title}</strong>
                        <small>{exam.description}</small>
                      </div>
                    </td>
                    <td>{exam.duration} min</td>
                    <td>{exam.totalMarks}</td>
                    <td>{exam.passingMarks}</td>
                    <td>
                      <span className={`status-badge ${exam.isActive ? 'active' : 'inactive'}`}>
                        {exam.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button 
                          onClick={() => handleManageQuestions(exam._id)}
                          className="btn-icon btn-questions"
                          title="Manage Questions"
                        >
                          Questions
                        </button>
                        <button 
                          onClick={() => handleEditExam(exam._id)}
                          className="btn-icon btn-edit"
                          title="Edit Exam"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(exam._id)}
                          className="btn-icon btn-delete"
                          title="Delete Exam"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

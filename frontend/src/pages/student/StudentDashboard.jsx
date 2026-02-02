import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import api from '../../services/api';
import '../../styles/student/StudentDashboard.css';

const StudentDashboard = () => {
  const [exams, setExams] = useState([]);
  const [attemptedExams, setAttemptedExams] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log('Fetching exams and results...');
      const [examsRes, resultsRes] = await Promise.all([
        api.get('/exams'),
        api.get('/results')
      ]);
      
      console.log('Exams response:', examsRes.data);
      console.log('Results response:', resultsRes.data);
      
      const allExams = examsRes.data.data;
      // Filter out results with null examId (deleted exams)
      const validResults = resultsRes.data.data.filter(r => r.examId !== null && r.examId._id);
      const attemptedExamIds = validResults.map(r => r.examId._id);
      
      console.log('All exams:', allExams);
      console.log('Attempted exam IDs:', attemptedExamIds);
      
      setExams(allExams);
      setAttemptedExams(attemptedExamIds);
      
      // Filter only unattempted exams
      const unattempted = allExams.filter(exam => !attemptedExamIds.includes(exam._id));
      console.log('Unattempted exams:', unattempted);
      
      setUpcomingExams(unattempted);
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      console.error('Error response:', err.response);
      setError('Failed to load exams');
      setLoading(false);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleStartExam = (examId) => {
    navigate(`/exam/${examId}`);
  };

  if (loading) {
    return (
      <div>
        <Navbar title="Student Dashboard" />
        <div className="loading-screen">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar title="Student Dashboard" />
      
      {/* Toast Notifications */}
      {error && <div className="toast-error">{error}</div>}
      
      <div className="dashboard-container">
        <div className="welcome-section">
          <div className="welcome-content">
            <h1>Welcome, {user?.name}!</h1>
            <p>You have {upcomingExams.length} Exam{upcomingExams.length !== 1 ? 's' : ''} left to attempt</p>
          </div>
          
          {/* Progress Circle */}
          <div className={`progress-circle ${
            attemptedExams.length === 0 ? 'none' : 
            attemptedExams.length === exams.length ? 'complete' : 'partial'
          }`}>
            <div className="progress-number">
              {attemptedExams.length}/{exams.length}
            </div>
            <div className="progress-label">
              Exams Taken
            </div>
            <div className="progress-sublabel">
              {exams.length > 0 ? Math.round((attemptedExams.length / exams.length) * 100) : 0}%
            </div>
          </div>
        </div>

        <div className="exams-section">
          <h2>Remaining Exams</h2>
          {upcomingExams.length === 0 ? (
            <p className="no-data">
              {attemptedExams.length > 0 
                ? "You've completed all available exams! Check the Results page to view your performance." 
                : "No exams available at the moment"}
            </p>
          ) : (
            <div className="exams-grid">
              {upcomingExams.map((exam) => (
                <div key={exam._id} className="exam-card">
                  <div className="exam-header">
                    <h3>{exam.title}</h3>
                  </div>
                  <p className="exam-description">{exam.description}</p>
                  <div className="exam-details">
                    <div className="detail-item">
                      <span className="label">Duration:</span>
                      <span className="value">{exam.duration} minutes</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Total Marks:</span>
                      <span className="value">{exam.totalMarks}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Passing Marks:</span>
                      <span className="value">{exam.passingMarks}</span>
                    </div>
                  </div>
                  <div className="exam-actions">
                    <button 
                      onClick={() => handleStartExam(exam._id)}
                      className="btn-primary"
                    >
                      Start Exam
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import api from '../../services/api';
import '../../styles/student/StudentDashboard.css';

const StudentExams = () => {
  const [exams, setExams] = useState([]);
  const [attemptedExams, setAttemptedExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
    fetchAttemptedExams();
  }, []);

  const fetchExams = async () => {
    try {
      const { data } = await api.get('/exams');
      setExams(data.data);
    } catch (err) {
      setError('Failed to load exams');
    }
  };

  const fetchAttemptedExams = async () => {
    try {
      const { data } = await api.get('/results');
      // Filter out results with null examId (deleted exams)
      const validResults = data.data.filter(r => r.examId !== null && r.examId._id);
      setAttemptedExams(validResults.map(r => r.examId._id));
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleStartExam = (examId) => {
    navigate(`/exam/${examId}`);
  };

  const handleViewResult = (examId) => {
    navigate(`/result/${examId}`);
  };

  if (loading) {
    return (
      <div>
        <Navbar title="Available Exams" />
        <div className="loading-screen">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar title="Available Exams" />
      <div className="dashboard-container">
        <div className="welcome-section">
          <h1>Available / Attempted Exams</h1>
          <p>Browse and attempt available examinations</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="exams-section">
          {exams.length === 0 ? (
            <p className="no-data">No exams available at the moment</p>
          ) : (
            <div className="exams-grid">
              {exams.map((exam) => {
                const isAttempted = attemptedExams.includes(exam._id);
                return (
                  <div key={exam._id} className="exam-card">
                    <div className="exam-header">
                      <h3>{exam.title}</h3>
                      {isAttempted && <span className="badge-attempted">Attempted</span>}
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
                      {isAttempted ? (
                        <button 
                          onClick={() => handleViewResult(exam._id)}
                          className="btn-secondary"
                        >
                          View Result
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleStartExam(exam._id)}
                          className="btn-primary"
                        >
                          Start Exam
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentExams;

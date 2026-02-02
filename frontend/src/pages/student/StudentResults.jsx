import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import api from '../../services/api';
import '../../styles/admin/ViewAllResults.css';

const StudentResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      console.log('Fetching results from /results endpoint...');
      const { data } = await api.get('/results');
      console.log('Results response:', data);
      
      // Filter out results with null examId (deleted exams)
      const validResults = data.data.filter(r => r.examId !== null && r.examId._id && r.examId.title);
      setResults(validResults);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching results:', err);
      console.error('Error response:', err.response);
      setError('Failed to load results');
      setLoading(false);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleViewResult = (examId) => {
    navigate(`/result/${examId}`);
  };

  if (loading) {
    return (
      <div>
        <Navbar title="My Results" />
        <div className="loading-screen">Loading results...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar title="My Results" />
      
      {/* Toast Notification */}
      {error && <div className="toast-error">{error}</div>}
      
      <div className="all-results-container">
        <div className="results-header">
          <h1>My Exam Results</h1>
          <p>View all your exam results and performance</p>
        </div>

        <div className="results-table-container">
          {results.length === 0 ? (
            <div className="no-data">
              <p style={{ fontSize: '18px', marginBottom: '10px', fontWeight: '600' }}>
                You haven't attempted any exams yet
              </p>
              <p style={{ fontSize: '14px', color: '#999' }}>
                That's why there are no exam results to display here. Visit the Exams page to start taking exams.
              </p>
            </div>
          ) : (
            <table className="results-table">
              <thead>
                <tr>
                  <th>Exam</th>
                  <th>Score</th>
                  <th>Percentage</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result._id}>
                    <td>{result.examId.title}</td>
                    <td>{result.score}/{result.totalMarks}</td>
                    <td>{result.percentage.toFixed(2)}%</td>
                    <td>
                      <span className={`status-badge ${result.passed ? 'passed' : 'failed'}`}>
                        {result.passed ? 'Passed' : 'Failed'}
                      </span>
                    </td>
                    <td>{new Date(result.submittedAt).toLocaleString()}</td>
                    <td>
                      <button 
                        onClick={() => handleViewResult(result.examId._id)}
                        className="btn-icon btn-edit"
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        View Details
                      </button>
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

export default StudentResults;

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../services/api';
import '../../styles/admin/ViewAllResults.css';

const ViewAllResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const { data } = await api.get('/results/all');
      // Filter out results with null examId or studentId (deleted exams/users)
      const validResults = data.data.filter(r => 
        r.examId !== null && 
        r.studentId !== null && 
        r.examId._id && 
        r.examId.title && 
        r.studentId._id && 
        r.studentId.name
      );
      setResults(validResults);
      setLoading(false);
    } catch (err) {
      setError('Failed to load results');
      setLoading(false);
      setTimeout(() => setError(''), 3000);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar title="All Results" />
        <div className="loading-screen">Loading results...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar title="All Results" />
      
      {/* Toast Notification */}
      {error && <div className="toast-error">{error}</div>}
      
      <div className="all-results-container">
        <div className="results-header">
          <h1>All Exam Results</h1>
          <p>View results of all students across all exams</p>
        </div>

        <div className="results-table-container">
          {results.length === 0 ? (
            <p className="no-data">No results available yet</p>
          ) : (
            <table className="results-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Exam</th>
                  <th>Score</th>
                  <th>Percentage</th>
                  <th>Status</th>
                  <th>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result._id}>
                    <td>{result.studentId.name}</td>
                    <td>{result.studentId.email}</td>
                    <td>{result.examId.title}</td>
                    <td>{result.score}/{result.totalMarks}</td>
                    <td>{result.percentage.toFixed(2)}%</td>
                    <td>
                      <span className={`status-badge ${result.passed ? 'passed' : 'failed'}`}>
                        {result.passed ? 'Passed' : 'Failed'}
                      </span>
                    </td>
                    <td>{new Date(result.submittedAt).toLocaleString()}</td>
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

export default ViewAllResults;

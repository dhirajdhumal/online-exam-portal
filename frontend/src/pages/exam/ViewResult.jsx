import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import api from '../../services/api';
import jsPDF from 'jspdf';
import '../../styles/exam/ViewResult.css';

const ViewResult = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResult();
  }, [examId]);

  const fetchResult = async () => {
    try {
      const { data } = await api.get(`/exams/${examId}/result`);
      setResult(data.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load result');
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Colors from Coolors palette
    const darkColor = [28, 28, 28];
    const grayColor = [218, 221, 216];
    const beigeColor = [236, 235, 228];
    
    // Header with dark background
    doc.setFillColor(...darkColor);
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('EXAM RESULT CERTIFICATE', pageWidth / 2, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Online Examination System', pageWidth / 2, 30, { align: 'center' });
    
    // Reset text color
    doc.setTextColor(...darkColor);
    let yPos = 55;
    
    // Student Information Section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Student Information', 20, yPos);
    yPos += 10;
    
    doc.setFillColor(...beigeColor);
    doc.rect(20, yPos, pageWidth - 40, 40, 'F');
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    yPos += 8;
    doc.text(`Name: ${result.studentId.name}`, 25, yPos);
    yPos += 8;
    doc.text(`Email: ${result.studentId.email}`, 25, yPos);
    yPos += 8;
    if (result.studentId.standard) {
      doc.text(`Standard: ${result.studentId.standard}`, 25, yPos);
      doc.text(`Division: ${result.studentId.division || 'N/A'}`, 110, yPos);
    }
    yPos += 8;
    if (result.studentId.rollNo) {
      doc.text(`Roll No: ${result.studentId.rollNo}`, 25, yPos);
    }
    if (result.studentId.phone) {
      doc.text(`Phone: ${result.studentId.phone}`, 110, yPos);
    }
    
    yPos += 15;
    
    // Exam Information Section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Exam Information', 20, yPos);
    yPos += 10;
    
    doc.setFillColor(...beigeColor);
    doc.rect(20, yPos, pageWidth - 40, 24, 'F');
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    yPos += 8;
    doc.text(`Exam: ${result.examId.title}`, 25, yPos);
    yPos += 8;
    doc.text(`Date: ${new Date(result.submittedAt).toLocaleDateString()}`, 25, yPos);
    doc.text(`Time: ${new Date(result.submittedAt).toLocaleTimeString()}`, 110, yPos);
    
    yPos += 15;
    
    // Result Status Section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Result Status', 20, yPos);
    yPos += 10;
    
    // Status badge
    const statusColor = result.passed ? [76, 175, 80] : [220, 53, 69];
    doc.setFillColor(...statusColor);
    doc.roundedRect(20, yPos, 60, 15, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(result.passed ? 'PASSED' : 'FAILED', 50, yPos + 10, { align: 'center' });
    
    doc.setTextColor(...darkColor);
    yPos += 25;
    
    // Performance Details Section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Performance Details', 20, yPos);
    yPos += 10;
    
    doc.setFillColor(...beigeColor);
    doc.rect(20, yPos, pageWidth - 40, 32, 'F');
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    yPos += 8;
    doc.text(`Score Obtained: ${result.score} / ${result.totalMarks}`, 25, yPos);
    yPos += 8;
    doc.text(`Percentage: ${result.percentage.toFixed(2)}%`, 25, yPos);
    yPos += 8;
    doc.text(`Passing Marks: ${result.examId.passingMarks}`, 25, yPos);
    doc.text(`Total Questions: ${result.answers.length}`, 110, yPos);
    
    yPos += 20;
    
    // Certificate ID
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 100, 100);
    doc.text(`Certificate ID: ${result._id}`, pageWidth / 2, yPos, { align: 'center' });
    
    // Footer
    doc.setFillColor(...darkColor);
    doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text('This is a computer-generated document and does not require a signature.', pageWidth / 2, pageHeight - 10, { align: 'center' });
    
    // Save PDF
    doc.save(`Result_${result.examId.title.replace(/\s+/g, '_')}_${result.studentId.name.replace(/\s+/g, '_')}.pdf`);
  };

  const getPerformanceClass = () => {
    if (result.percentage >= 75) return '';
    if (result.percentage >= 50) return 'medium';
    return 'low';
  };

  if (loading) {
    return (
      <div>
        <Navbar title="Loading Result..." />
        <div className="loading-screen">Loading result...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar title="Error" />
        <div className="error-screen">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar title="Exam Result" />
      <div className="result-container">
        <div className="result-header">
          <div className="result-status">
            {result.passed ? '🎉' : '📊'}
          </div>
          <h1 className="result-title">{result.examId.title}</h1>
          <p className="result-subtitle">Exam Result</p>
          <span className={`status-badge ${result.passed ? 'passed' : 'failed'}`}>
            {result.passed ? 'Passed' : 'Failed'}
          </span>
        </div>

        <div className="result-stats">
          <div className="stat-card">
            <div className="stat-label">Score</div>
            <div className={`stat-value ${result.passed ? 'success' : 'danger'}`}>
              {result.score}/{result.totalMarks}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Percentage</div>
            <div className={`stat-value ${result.passed ? 'success' : 'danger'}`}>
              {result.percentage.toFixed(2)}%
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Questions</div>
            <div className="stat-value">{result.answers.length}</div>
          </div>
        </div>

        <div className="student-info">
          <h3>Student Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{result.studentId.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{result.studentId.email}</span>
            </div>
            {result.studentId.standard && (
              <div className="info-item">
                <span className="info-label">Standard:</span>
                <span className="info-value">{result.studentId.standard}</span>
              </div>
            )}
            {result.studentId.division && (
              <div className="info-item">
                <span className="info-label">Division:</span>
                <span className="info-value">{result.studentId.division}</span>
              </div>
            )}
            {result.studentId.rollNo && (
              <div className="info-item">
                <span className="info-label">Roll Number:</span>
                <span className="info-value">{result.studentId.rollNo}</span>
              </div>
            )}
            {result.studentId.phone && (
              <div className="info-item">
                <span className="info-label">Phone:</span>
                <span className="info-value">{result.studentId.phone}</span>
              </div>
            )}
            <div className="info-item">
              <span className="info-label">Submitted:</span>
              <span className="info-value">
                {new Date(result.submittedAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="performance-section">
          <h3>Performance Analysis</h3>
          <div className="performance-bar">
            <div 
              className={`performance-fill ${getPerformanceClass()}`}
              style={{ width: `${result.percentage}%` }}
            >
              {result.percentage.toFixed(1)}%
            </div>
          </div>
          <div className="performance-details">
            <span>Passing Marks: {result.examId.passingMarks}</span>
            <span>Your Score: {result.score}</span>
          </div>
        </div>

        <div className="actions-section">
          <button onClick={downloadPDF} className="btn-primary">
            📥 Download Your {result.examId.title} Result
          </button>
          <button onClick={() => navigate('/student/dashboard')} className="btn-secondary">
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewResult;

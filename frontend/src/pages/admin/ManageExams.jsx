import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import api from '../../services/api';
import '../../styles/admin/ManageExams.css';

const ManageExams = () => {
  const { examId } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    totalMarks: '',
    passingMarks: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (examId) {
      setIsEditMode(true);
      fetchExam();
    }
  }, [examId]);

  const fetchExam = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/exams/${examId}`);
      const exam = data.data;
      setFormData({
        title: exam.title,
        description: exam.description,
        duration: exam.duration,
        totalMarks: exam.totalMarks,
        passingMarks: exam.passingMarks
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to load exam details');
      setLoading(false);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (isEditMode) {
        await api.put(`/exams/${examId}`, formData);
        setSuccess('Exam updated successfully!');
      } else {
        await api.post('/exams', formData);
        setSuccess('Exam created successfully!');
        
        // Reset form for create mode
        setFormData({
          title: '',
          description: '',
          duration: '',
          totalMarks: '',
          passingMarks: ''
        });
      }

      // Redirect to admin dashboard after 2 seconds
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} exam`);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleCancel = () => {
    navigate('/admin/dashboard');
  };

  if (loading) {
    return (
      <div>
        <Navbar title="Exam Management" />
        <div className="loading-screen">Loading exam details...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar title="Exam Management" />
      
      {/* Toast Notifications */}
      {success && <div className="toast-success">{success}</div>}
      {error && <div className="toast-error">{error}</div>}
      
      <div className="exam-management-container">
        <div className="exam-management-header">
          <h1>{isEditMode ? 'Edit Exam' : 'Create New Exam'}</h1>
          <p>{isEditMode ? 'Update the exam details below' : 'Fill in the details to create a new examination'}</p>
        </div>

        <div className="exam-management-form-wrapper">
          <form onSubmit={handleSubmit} className="exam-management-form">
            <div className="form-group">
              <label htmlFor="title">Exam Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Mathematics Final Exam"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a brief description of the exam"
                rows="4"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="duration">Duration (minutes) *</label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 60"
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="totalMarks">Total Marks *</label>
                <input
                  type="number"
                  id="totalMarks"
                  name="totalMarks"
                  value={formData.totalMarks}
                  onChange={handleChange}
                  placeholder="e.g., 100"
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="passingMarks">Passing Marks *</label>
              <input
                type="number"
                id="passingMarks"
                name="passingMarks"
                value={formData.passingMarks}
                onChange={handleChange}
                placeholder="e.g., 40"
                min="1"
                max={formData.totalMarks || undefined}
                required
              />
              <small className="form-hint">
                Must be less than or equal to total marks
              </small>
            </div>

            <div className="form-actions">
              <button type="button" onClick={handleCancel} className="btn-cancel">
                Cancel
              </button>
              <button type="submit" className="btn-submit">
                {isEditMode ? 'Update Exam' : 'Create Exam'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageExams;

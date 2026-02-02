import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import api from '../../services/api';
import '../../styles/admin/ManageQuestions.css';

const ManageQuestions = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    marks: 1
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchExamAndQuestions();
  }, [examId]);

  const fetchExamAndQuestions = async () => {
    try {
      const [examRes, questionsRes] = await Promise.all([
        api.get(`/exams/${examId}`),
        api.get(`/exams/${examId}/questions`)
      ]);
      setExam(examRes.data.data);
      setQuestions(questionsRes.data.data);
    } catch (err) {
      setError('Failed to load data');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleOpenModal = (question = null) => {
    if (question) {
      setEditingQuestion(question);
      setFormData({
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
        marks: question.marks
      });
    } else {
      setEditingQuestion(null);
      setFormData({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        marks: 1
      });
    }
    setShowModal(true);
    setError('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingQuestion(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({
      ...formData,
      options: newOptions
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (formData.options.some(opt => !opt.trim())) {
      setError('All options must be filled');
      return;
    }

    try {
      const payload = {
        question: formData.question,
        options: formData.options,
        correctAnswer: formData.correctAnswer,
        marks: formData.marks
      };

      if (editingQuestion) {
        await api.put(`/questions/${editingQuestion._id}`, payload);
        setSuccess('Question updated successfully!');
      } else {
        await api.post(`/exams/${examId}/questions`, payload);
        setSuccess('Question added successfully!');
      }
      fetchExamAndQuestions();
      handleCloseModal();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save question');
    }
  };

  const handleDelete = async (questionId) => {
    if (!window.confirm('Are you sure you want to delete this question?')) {
      return;
    }

    try {
      setError('');
      setSuccess('');
      await api.delete(`/questions/${questionId}`);
      setSuccess('Question deleted successfully!');
      fetchExamAndQuestions();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete question');
    }
  };

  return (
    <div>
      <Navbar title={exam?.title || 'Manage Questions'} />
      
      {/* Toast Notifications */}
      {success && <div className="toast-success">{success}</div>}
      {error && <div className="toast-error">{error}</div>}
      
      <div className="questions-container">
        <div className="questions-header">
          <h1>{exam?.title}</h1>
          <p>Manage questions for this exam</p>
        </div>

        <div className="questions-actions">
          <h2>Questions ({questions.length})</h2>
          <button onClick={() => handleOpenModal()} className="btn-add">
            + Add Question
          </button>
        </div>

        {questions.length === 0 ? (
          <p className="no-data">No questions added yet</p>
        ) : (
          <div className="questions-list">
            {questions.map((question, index) => (
              <div key={question._id} className="question-item">
                <div className="question-item-header">
                  <span className="question-number-badge">Q{index + 1}</span>
                  <div className="question-actions">
                    <button 
                      onClick={() => handleOpenModal(question)}
                      className="btn-edit-q"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(question._id)}
                      className="btn-delete-q"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="question-text">{question.question}</div>
                <ul className="question-options">
                  {question.options.map((option, optIndex) => (
                    <li 
                      key={optIndex}
                      className={`option-display ${optIndex === question.correctAnswer ? 'correct' : ''}`}
                    >
                      {String.fromCharCode(65 + optIndex)}. {option}
                      {optIndex === question.correctAnswer && ' ✓'}
                    </li>
                  ))}
                </ul>
                <div className="question-marks">Marks: {question.marks}</div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingQuestion ? 'Edit Question' : 'Add New Question'}</h2>
                <button onClick={handleCloseModal} className="btn-close">×</button>
              </div>

              {error && <div className="error-message">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Question *</label>
                  <textarea
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Options *</label>
                  <div className="options-inputs">
                    {formData.options.map((option, index) => (
                      <div key={index} className="option-input-group">
                        <input
                          type="radio"
                          name="correctAnswer"
                          value={index}
                          checked={formData.correctAnswer === index}
                          onChange={() => setFormData({ ...formData, correctAnswer: index })}
                        />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          placeholder={`Option ${String.fromCharCode(65 + index)}`}
                          required
                        />
                      </div>
                    ))}
                  </div>
                  <small style={{ color: '#666', fontSize: '12px' }}>
                    Select the radio button for the correct answer
                  </small>
                </div>

                <div className="form-group">
                  <label>Marks *</label>
                  <input
                    type="number"
                    name="marks"
                    value={formData.marks}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="button" onClick={handleCloseModal} className="btn-cancel">
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    {editingQuestion ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageQuestions;

import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import api from '../../services/api';
import '../../styles/exam/TakeExam.css';

const TakeExam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    fetchExamData();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [examId]);

  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timeLeft]);

  const fetchExamData = async () => {
    try {
      // Check if already attempted
      const resultCheck = await api.get(`/exams/${examId}/result`);
      if (resultCheck.data.success) {
        alert('You have already attempted this exam!');
        navigate(`/result/${examId}`);
        return;
      }
    } catch (err) {
      // Not attempted, continue
    }

    try {
      const [examRes, questionsRes] = await Promise.all([
        api.get(`/exams/${examId}`),
        api.get(`/exams/${examId}/questions`)
      ]);

      setExam(examRes.data.data);
      setQuestions(questionsRes.data.data);
      setTimeLeft(examRes.data.data.duration * 60); // Convert minutes to seconds
      setLoading(false);
    } catch (err) {
      setError('Failed to load exam');
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, answerIndex) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex
    });
  };

  const handleAutoSubmit = async () => {
    if (submitting) return;
    alert('Time is up! Your exam will be submitted automatically.');
    await submitExam();
  };

  const handleSubmit = async () => {
    const unanswered = questions.length - Object.keys(answers).length;
    if (unanswered > 0) {
      const confirm = window.confirm(
        `You have ${unanswered} unanswered question(s). Do you want to submit anyway?`
      );
      if (!confirm) return;
    }
    await submitExam();
  };

  const submitExam = async () => {
    setSubmitting(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    try {
      const formattedAnswers = questions.map((q) => ({
        questionId: q._id,
        selectedAnswer: answers[q._id] !== undefined ? answers[q._id] : -1
      }));

      await api.post(`/exams/${examId}/submit`, {
        answers: formattedAnswers
      });

      navigate(`/result/${examId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit exam');
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerClass = () => {
    const minutes = timeLeft / 60;
    if (minutes <= 2) return 'danger';
    if (minutes <= 5) return 'warning';
    return '';
  };

  if (loading) {
    return (
      <div>
        <Navbar title="Loading Exam..." />
        <div className="loading-screen">Loading exam...</div>
      </div>
    );
  }

  if (error && !exam) {
    return (
      <div>
        <Navbar title="Error" />
        <div className="error-screen">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar title={exam?.title} />
      <div className="exam-container">
        <div className="exam-header-section">
          <div className="exam-info">
            <h2>{exam?.title}</h2>
            <div className="exam-meta">
              Total Questions: {questions.length} | Total Marks: {exam?.totalMarks}
            </div>
          </div>
          <div className="timer-section">
            <div className="timer-label">Time Remaining</div>
            <div className={`timer-display ${getTimerClass()}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="questions-section">
          {questions.map((question, index) => (
            <div key={question._id} className="question-card">
              <div className="question-header">
                <div className="question-number">{index + 1}</div>
                <div className="question-text">{question.question}</div>
                <div className="question-marks">{question.marks} mark{question.marks > 1 ? 's' : ''}</div>
              </div>
              <ul className="options-list">
                {question.options.map((option, optIndex) => (
                  <li key={optIndex} className="option-item">
                    <label 
                      className={`option-label ${answers[question._id] === optIndex ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name={`question-${question._id}`}
                        value={optIndex}
                        checked={answers[question._id] === optIndex}
                        onChange={() => handleAnswerChange(question._id, optIndex)}
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="submit-section">
          <div className="submit-warning">
            ⚠️ Once submitted, you cannot change your answers. Please review before submitting.
          </div>
          <button 
            onClick={handleSubmit}
            disabled={submitting}
            className="btn-submit"
          >
            {submitting ? 'Submitting...' : 'Submit Exam'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TakeExam;

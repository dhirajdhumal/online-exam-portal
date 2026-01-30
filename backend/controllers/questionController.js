import Question from '../models/Question.js';
import Exam from '../models/Exam.js';

// @desc    Add question to exam
// @route   POST /api/exams/:examId/questions
// @access  Private/Admin
export const addQuestion = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.examId);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }

    req.body.examId = req.params.examId;
    const question = await Question.create(req.body);

    res.status(201).json({
      success: true,
      data: question
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get questions for exam
// @route   GET /api/exams/:examId/questions
// @access  Private
export const getQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find({ examId: req.params.examId });

    // Hide correct answers for students
    if (req.user.role === 'student') {
      const questionsWithoutAnswers = questions.map(q => ({
        _id: q._id,
        question: q.question,
        options: q.options,
        marks: q.marks
      }));

      return res.status(200).json({
        success: true,
        count: questionsWithoutAnswers.length,
        data: questionsWithoutAnswers
      });
    }

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update question
// @route   PUT /api/questions/:id
// @access  Private/Admin
export const updateQuestion = async (req, res, next) => {
  try {
    let question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: question
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete question
// @route   DELETE /api/questions/:id
// @access  Private/Admin
export const deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    await question.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

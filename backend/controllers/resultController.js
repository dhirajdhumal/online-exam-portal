import Result from '../models/Result.js';
import Question from '../models/Question.js';
import Exam from '../models/Exam.js';

// @desc    Submit exam and calculate result
// @route   POST /api/exams/:examId/submit
// @access  Private/Student
export const submitExam = async (req, res, next) => {
  try {
    const { answers } = req.body;
    const examId = req.params.examId;
    const studentId = req.user._id;

    // Check if already submitted
    const existingResult = await Result.findOne({ studentId, examId });
    if (existingResult) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted this exam'
      });
    }

    // Get exam details
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }

    // Get all questions with correct answers
    const questions = await Question.find({ examId });

    // Calculate score
    let score = 0;
    answers.forEach(answer => {
      const question = questions.find(q => q._id.toString() === answer.questionId);
      if (question && question.correctAnswer === answer.selectedAnswer) {
        score += question.marks;
      }
    });

    const percentage = (score / exam.totalMarks) * 100;
    const passed = score >= exam.passingMarks;

    // Save result
    const result = await Result.create({
      studentId,
      examId,
      answers,
      score,
      totalMarks: exam.totalMarks,
      percentage,
      passed
    });

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get student results
// @route   GET /api/results
// @access  Private/Student
export const getMyResults = async (req, res, next) => {
  try {
    const results = await Result.find({ studentId: req.user._id })
      .populate('examId', 'title description totalMarks')
      .sort('-submittedAt');

    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get result by exam
// @route   GET /api/exams/:examId/result
// @access  Private/Student
export const getResultByExam = async (req, res, next) => {
  try {
    const result = await Result.findOne({
      studentId: req.user._id,
      examId: req.params.examId
    })
      .populate('examId', 'title description totalMarks passingMarks duration')
      .populate('studentId', 'name email standard division rollNo phone');

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Result not found'
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all results (Admin)
// @route   GET /api/results/all
// @access  Private/Admin
export const getAllResults = async (req, res, next) => {
  try {
    const results = await Result.find()
      .populate('studentId', 'name email')
      .populate('examId', 'title')
      .sort('-submittedAt');
      
      if (!results || results.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        message: 'No results found',
        data: []
      });
    }

    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    next(error);
  }
};

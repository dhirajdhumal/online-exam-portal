import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  question: {
    type: String,
    required: [true, 'Please provide question text']
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: Number,
    required: [true, 'Please provide correct answer index'],
    min: 0,
    max: 3
  },
  marks: {
    type: Number,
    required: [true, 'Please provide marks for this question'],
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Question', questionSchema);

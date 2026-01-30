import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide exam title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide exam description']
  },
  duration: {
    type: Number,
    required: [true, 'Please provide exam duration in minutes']
  },
  totalMarks: {
    type: Number,
    required: [true, 'Please provide total marks']
  },
  passingMarks: {
    type: Number,
    required: [true, 'Please provide passing marks']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Exam', examSchema);

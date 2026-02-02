import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Exam from './models/Exam.js';
import Question from './models/Question.js';
import Result from './models/Result.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Exam.deleteMany();
    await Question.deleteMany();
    await Result.deleteMany();

    // Create Admin
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });

    // Create Students
    const student1 = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'student123',
      role: 'student',
      standard: '10th',
      division: 'A',
      rollNo: '101',
      phone: '+91 9876543210'
    });

    const student2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'student123',
      role: 'student',
      standard: '10th',
      division: 'B',
      rollNo: '102',
      phone: '+91 9876543211'
    });

    // Create Exam
    const exam = await Exam.create({
      title: 'JavaScript Fundamentals',
      description: 'Test your knowledge of JavaScript basics',
      duration: 60,
      totalMarks: 20,
      passingMarks: 12,
      isActive: true,
      createdBy: admin._id
    });

    // Create Questions
    await Question.insertMany([
      {
        examId: exam._id,
        question: 'What is JavaScript?',
        options: [
          'A programming language',
          'A database',
          'An operating system',
          'A framework'
        ],
        correctAnswer: 0,
        marks: 5
      },
      {
        examId: exam._id,
        question: 'Which keyword is used to declare a variable in JavaScript?',
        options: ['var', 'int', 'string', 'variable'],
        correctAnswer: 0,
        marks: 5
      },
      {
        examId: exam._id,
        question: 'What does DOM stand for?',
        options: [
          'Document Object Model',
          'Data Object Model',
          'Digital Object Model',
          'Document Oriented Model'
        ],
        correctAnswer: 0,
        marks: 5
      },
      {
        examId: exam._id,
        question: 'Which method is used to parse a string to an integer?',
        options: ['parseInt()', 'parseFloat()', 'Number()', 'toInteger()'],
        correctAnswer: 0,
        marks: 5
      }
    ]);

    console.log('✅ Sample data imported successfully!');
    console.log('\nCreated Users:');
    console.log('Admin - Email: admin@example.com, Password: admin123');
    console.log('Student 1 - Email: john@example.com, Password: student123');
    console.log('Student 2 - Email: jane@example.com, Password: student123');
    console.log(`\nCreated Exam: ${exam.title} (ID: ${exam._id})`);
    console.log('Created 4 questions for the exam');

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Exam.deleteMany();
    await Question.deleteMany();
    await Result.deleteMany();

    console.log('✅ Data destroyed successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

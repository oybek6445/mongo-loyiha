const Grade = require('../models/Grade');
const Subject = require('../models/Subject');
const User = require('../models/User');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const createGrade = async (req, res) => {
  try {
    const { studentId, subjectId, grade } = req.body;
    const teacher = req.user._id;

    // Verify the subject belongs to the teacher
    const subject = await Subject.findById(subjectId);
    if (!subject || !subject.teacher.equals(teacher)) {
      return res.status(403).json({ message: 'Unauthorized to grade this subject' });
    }

    // Verify the student exists
    const student = await User.findById(studentId);
    if (!student || student.role !== 'student') {
      return res.status(400).json({ message: 'Invalid student' });
    }

    const newGrade = new Grade({
      student: studentId,
      subject: subjectId,
      grade,
      teacher
    });

    await newGrade.save();
    res.status(201).json(newGrade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudentGrades = async (req, res) => {
  try {
    const studentId = req.params.id || req.user._id;
    const isSelf = req.user._id.equals(studentId);

    // Students can only view their own grades
    if (req.user.role === 'student' && !isSelf) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const grades = await Grade.find({ student: studentId })
      .populate('subject', 'name')
      .populate('teacher', 'fullName');

    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createGrade, getStudentGrades };

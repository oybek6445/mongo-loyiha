const Subject = require('../models/Subject');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const createSubject = async (req, res) => {
  try {
    const { name } = req.body;
    const teacher = req.user._id;

    const subject = new Subject({
      name,
      teacher
    });

    await subject.save();
    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate('teacher', 'fullName email');
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createSubject, getSubjects };

const express = require('express');
const router = express.Router();
const { createSubject, getSubjects } = require('../controller/subjectController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// @route   POST /subjects
// @desc    Create a new subject (teacher only)
// @access  Private (Teacher)
router.post('/', authenticate, authorize(['teacher']), createSubject);

// @route   GET /subjects
// @desc    Get all subjects
// @access  Public
router.get('/', getSubjects);

module.exports = router;

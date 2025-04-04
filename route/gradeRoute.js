const express = require('express');
const router = express.Router();
const { createGrade, getStudentGrades } = require('../controller/gradeController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Grades
 *   description: Grade management endpoints
 * 
 * @swagger
 * components:
 *   schemas:
 *     Grade:
 *       type: object
 *       properties:
 *         studentId:
 *           type: string
 *         subjectId:
 *           type: string
 *         grade:
 *           type: number
 *         date:
 *           type: string
 *           format: date
 *       required:
 *         - studentId
 *         - subjectId
 *         - grade
 */

/**
 * @swagger
 * /grades:
 *   post:
 *     summary: Create a new grade (teacher only)
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Grade'
 *     responses:
 *       201:
 *         description: Grade created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not a teacher)
 */
router.post('/', authenticate, authorize(['teacher']), createGrade);

/**
 * @swagger
 * /grades/me:
 *   get:
 *     summary: Get current student's grades
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of student's grades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grade'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not a student)
 */
router.get('/me', authenticate, authorize(['student']), getStudentGrades);

/**
 * @swagger
 * /grades/{id}:
 *   get:
 *     summary: Get grades for a specific student (teacher only)
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Student ID
 *     responses:
 *       200:
 *         description: List of student's grades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grade'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not a teacher)
 */
router.get('/:id', authenticate, authorize(['teacher']), getStudentGrades);

module.exports = router;

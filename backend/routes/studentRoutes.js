import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import * as StudentController from '../controllers/studentController.js'

const router = express.Router()

router.post('/:workspaceId', authMiddleware, StudentController.createStudent )
router.get('/:workspaceId', authMiddleware, StudentController.getStudentsInWorkspace)
router.patch('/:id', authMiddleware, StudentController.updateStudent)
router.delete('/:id', authMiddleware, StudentController.deleteStudent)

export default router


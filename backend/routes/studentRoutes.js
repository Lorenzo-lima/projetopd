import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
<<<<<<< HEAD
import * as studentController from '../controllers/studentController.js'

const router = express.Router()

router.get('/', authMiddleware,)
router.get('/:id', authMiddleware,)

export default router
=======
import * as StudentController from '../controllers/studentController.js'

const router = express.Router()

router.post('/:workspaceId', authMiddleware, StudentController.createStudent )
router.get('/:workspaceId', authMiddleware, StudentController.getStudentsInWorkspace)
router.patch('/:id', authMiddleware, StudentController.updateStudent)
router.delete('/:id', authMiddleware, StudentController.deleteStudent)

export default router
>>>>>>> e0b1075df7cfad5d30426b50b5f60bdba06b8cc7

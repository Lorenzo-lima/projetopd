import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import * as studentController from '../controllers/studentController.js'

const router = express.Router()

router.get('/', authMiddleware,)
router.get('/:id', authMiddleware,)

export default router
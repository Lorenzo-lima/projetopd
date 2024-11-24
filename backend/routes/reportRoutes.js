import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import * as reportController from '../controllers/reportController.js'

const router = express.Router()

router.post('/:studentId', authMiddleware, reportController.createReport)
router.get('/', authMiddleware, reportController.getAllReports)
router.get('/:studentId', authMiddleware, reportController.getReportsByStudents)
router.patch('/:id', authMiddleware, reportController.updateReport)
router.delete('/:id', authMiddleware, reportController.deleteReport)

export default router

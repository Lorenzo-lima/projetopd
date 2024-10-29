import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import * as workspaceController from '../controllers/workspaceController.js'

const router = express.Router()

router.get('/', authMiddleware, workspaceController.getAllWorkspaces)
router.get('/:id', authMiddleware, workspaceController.getWorkspaceById)

export default router
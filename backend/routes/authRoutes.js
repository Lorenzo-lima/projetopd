import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import * as authController from '../controllers/authController.js'

const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/validate', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Usuário autenticado!' });
})

export default router


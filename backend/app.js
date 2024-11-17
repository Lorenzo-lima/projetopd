import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import limiter from './middleware/rateLimiterMiddleware.js'
import authRoutes from './routes/authRoutes.js'
import workspaceRoutes from './routes/workspaceRoutes.js'
import studentRoutes from './routes/studentRoutes.js'
import reportRoutes from './routes/reportRoutes.js'
import userRoutes from './routes/userRoutes.js'


const app = express()

// Default Middleware
app.use(express.json())
app.use(helmet())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(limiter)
app.use(cookieParser())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/workspaces', workspaceRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/reports', reportRoutes)
app.use('/api/user', userRoutes)

export default app

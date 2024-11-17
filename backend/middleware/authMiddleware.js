import jwt from 'jsonwebtoken';

export default function authMiddleware (req, res, next) {
    const token = req.cookies.authToken

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ message: 'Token invalido', error: error.message })
    }
}
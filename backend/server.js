import expressapp from './app.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const app = expressapp

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {})
            .then(() => console.log('MongoDB Connected'))
    } catch (error) {
        console.error('Erro ao conectar com o banco de dados', error)
        process.exit(1)
    }
}

const PORT = process.env.PORT

const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server iniciado na porta ${PORT}`)
        })
    } catch (error) {
        console.error('Erro ao iniciar o servidor' ,error)
    }
}

startServer()
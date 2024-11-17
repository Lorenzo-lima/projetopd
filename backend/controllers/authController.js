import User from '../models/userModel.js'
import Workspace from "../models/workspaceModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export const register = async (req, res) => {
    try {
        let { name, email, password, confirm_password, role } = req.body

        if(!name || !email || !password || !confirm_password) {
            return res.status(400).json({ message: 'Todos os campos sao obrigatorios.' })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'Email ja esta em uso' })
        }

        if (password !== confirm_password) {
            return res.status(400).json({ message: 'As senhas não coincidem.' })
        }

        name = capitalizeFirstLetter(name)

        const newUser = new User({
            name,
            email,
            password,
            role: role || 'user',
        })

        await newUser.save()

        const newWorkspace = new Workspace({
            name: `${name}`,
            owner: newUser._id,
            students: []
        })

        const savedWorkspace = await newWorkspace.save()

        newUser.workspace = savedWorkspace._id
        await newUser.save()

        res.status(201).json({ message: 'Usuário registrado com sucesso!',
            id: newUser._id,
            name: newUser.name,
            email: newUser.email, password: newUser.password,
            role: newUser.role
        })

    } catch (error) {
        console.error('Erro no servidor', error)
        res.status(500).json({ message: 'Erro ao servidor', error: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.'})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Senha incorreta'})
        }

        const token = jwt.sign({ id: user._id , role: user.role}, process.env.JWT_SECRET, { expiresIn: '2h' })

        res.cookie('authToken', token, {
            httpOnly: true, // O cookie não será acessível via JavaScript
            secure: process.env.NODE_ENV === 'production', // HTTPS apenas em produção
            sameSite: 'Strict', // Proteção contra CSRF
            maxAge: 2 * 60 * 60 * 1000, // 2 horas
        });
        res.status(201).json({ message: 'Login bem sucedido!' });


    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Erro no servidor', error: error.message })
    }
}

export const logout = (req, res) => {
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    })
    res.status(200).json({ message: 'Logout realizado com sucesso' })
}
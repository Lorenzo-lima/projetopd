import User from '../models/userModel.js'

export const getUserData = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        if (!user) {
            return res.status(404).send('Usuário não encontrado')
        }

        res.status(200).json({
                name: user.name,
                email: user.email,
                role: user.role
        })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar dados do usuário' })
    }
}
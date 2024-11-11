/* import User from '../models/userModel.js';

// Controlador para obter os dados do usuário autenticado
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclui o campo senha
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar dados do usuário', error: error.message });
    }
};

// Controlador para obter todos os usuários (apenas para admin)
export const getAllUsers = async (req, res) => {
    try {
        // Verificar se o usuário é admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Acesso negado' });
        }

        const users = await User.find().select('-password'); // Exclui o campo senha
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
    }
};

// Controlador para atualizar perfil do usuário
export const updateUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Atualizar os campos
        user.name = name || user.name;
        user.email = email || user.email;

        // Se uma nova senha foi fornecida, atualiza
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar usuário', error: error.message });
    }
};

// Controlador para excluir um usuário (Apenas Admin)
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Verificar se o usuário é admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Acesso negado' });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        await user.remove();
        res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir usuário', error: error.message });
    }
};
*/
import Student from "../models/studentModel.js"
import Workspace from "../models/workspaceModel.js"

export const getAllWorkspaces = async (req, res) => {
    try {
        // Obter todas as workspaces com informações básicas
        const workspaces = await Workspace.find().select('name owner').populate('owner', 'name email')
        res.status(200).json(workspaces)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar workspaces', error: error.message })
    }
}

export const getWorkspaceById = async (req, res) => {

    try {
        const { id } = req.params

        const workspace = await Workspace.findById(id)
            .populate({
                path: 'students',
                populate: {
                    path: 'reports',
                    model: 'Report'
                }
            })
            .populate('owner', 'name email')

        if (!workspace) {
            return res.status(404).json({ message: 'Nenhuma workspace encontrada' })
        }

        if (req.user.role !== 'admin' && req.user.id !== workspace.owner._id.toString()) {
            return res.status(403).json({ message: 'Você não tem permissão para acessar esta Workspace!' })
        }

        res.status(200).json(workspace)

    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar workspace', error: error.message })
    }
}
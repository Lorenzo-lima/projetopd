import Student from "../models/studentModel.js"
import Workspace from "../models/workspaceModel.js"

export const createStudent = async (req, res) => {
    const { workspaceId } = req.params
    const { name, email, pdcode } = req.body

    try {
        if (!name || !email || !pdcode) {
            return res.status(403).json({ message: 'Todos os campos são obrigatórios' })
        }

        const workspace = await Workspace.findById(workspaceId)

        if(!workspace) {
           return res.status(404).json({ message: 'Workspace não encontrada' })
        }

        if(req.user.role !== 'admin' && req.user.id !== workspace.owner.toString()) {
            return res.status(403).json({ message: 'Acesso negado' })
        }

        const newStudent = new Student({ name, email, pdcode, workspace: workspaceId })
        const savedStudent = await newStudent.save()

        workspace.students.push(savedStudent._id)
        await workspace.save()

        res.status(201).json(savedStudent)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar aluno', error: error.message })
    }
}

export const getStudentsInWorkspace = async (req, res) => {
    const { workspaceId } = req.params

    try {
        const workspace = await Workspace.findById(workspaceId).populate('students')

        if(!workspace) {
            return res.status(404).json({ message: 'Workspace não encontrada' })
        }

        if(req.user.role !== 'admin' && req.user.id !== workspace.owner.toString()) {
            return res.status(403).json({ message: 'Acesso negado' })
        }

        res.status(200).json(workspace.students)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar alunos', error: error.message })
    }
}


export const updateStudent = async (req, res) => {
    const { id } = req.params
    const { name, email, pdcode } = req.body

    try {
        const student = await Student.findById(id)

        if(!student) {
            return res.status(404).json({ message: 'Aluno não encontrado' })
        }

        if(req.user.role !== 'admin' && req.user.id !== student.workspace.owner.toString()) {
            return res.status(403).json({ message: 'Acesso negado' })
        }

        student.name = name || student.name
        student.email = email || student.email
        student.pdcode = pdcode || student.pdcode

        const updatedStudent = await student.save()

        res.status(200).json(updatedStudent)
    } catch(error) {
        res.status(500).json({ message: 'Erro ao atualizar aluno', error: error.message })
    }
}

export const deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        // Busca o aluno pelo ID
        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({ message: "Aluno não encontrado" });
        }

        // Busca o workspace associado ao aluno
        const workspace = await Workspace.findById(student.workspace);

        if (!workspace) {
            return res.status(404).json({ message: "Workspace associado não encontrado" });
        }

        // Verifica permissões
        if (req.user.role !== "admin" && req.user.id !== workspace.owner.toString()) {
            return res.status(403).json({ message: "Acesso negado" });
        }

        // Exclui o aluno usando deleteOne
        await Student.deleteOne({ _id: id });

        // Remove o aluno da lista de alunos no workspace
        workspace.students = workspace.students.filter(
            (studentId) => studentId.toString() !== id
        );
        await workspace.save();

        res.status(200).json({ message: "Aluno excluído com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir aluno", error: error.message });
    }
};



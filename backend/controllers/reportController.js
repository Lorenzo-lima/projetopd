import Report from "../models/reportsModel.js"
import Student from "../models/studentModel.js"

export const createReport = async (req, res) => {
    const { studentId } = req.params
    const { presenceStatus, appointmentTime, resume, strategies, observations } = req.body

    try {
        if(!presenceStatus || !appointmentTime || !resume) {
            return res.status(403).json({ message: 'Todos os campos são obrigatórios' })
        }

        const student = await Student.findById(studentId).populate('workspace')

        if(!student) {
            return res.status(404).json({ message: 'Aluno não encontrado' })

        }

        if(req.user.role !== 'admin' && req.user.id !== student.workspace.owner.toString()) {
            return res.status(403).json({ message: 'Acesso negado' })
        }

        const newReport = new Report({
            presenceStatus,
            appointmentTime,
            resume,
            strategies,
            observations,
            student: studentId
        })

        const savedReport = await newReport.save()

        res.status(201).json(savedReport)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar relatório', error: error.message })
    }
}

export const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find().populate('student'); // Inclui informações do estudante referenciado

        if (!reports || reports.length === 0) {
            return res.status(404).json({ message: 'Nenhum relatório encontrado' });
        }

        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar relatórios', error: error.message });
    }
};

export const getReportsByStudents = async (req, res) => {
    const { studentId } = req.params;

    try {
        const reports = await Report.find({ student: studentId });

        if (!reports || reports.length === 0) {
            return res.status(404).json({ message: 'Nenhum relatório encontrado para este aluno' });
        }

        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar relatórios', error: error.message });
    }
};


export const updateReport = async (req, res) => {
    const { id } = req.params;
    const { presenceStatus, appointmentTime, resume, strategies, observations } = req.body;

    try {
        // Buscar o relatório com dados relacionados
        const report = await Report.findById(id)
            .populate({
                path: 'student',
                populate: {
                    path: 'workspace',
                    select: 'owner', // Apenas carrega o dono do workspace
                },
            });

        if (!report) {
            return res.status(404).json({ message: 'Relatório não encontrado' });
        }

        // Verifica permissões
        if (
            req.user.role !== 'admin' &&
            (!report.student || !report.student.workspace || req.user.id !== report.student.workspace.owner.toString())
        ) {
            return res.status(403).json({ message: 'Acesso negado' });
        }

        // Atualiza os dados do relatório
        report.presenceStatus = presenceStatus || undefined;
        report.appointmentTime = appointmentTime || undefined;
        report.resume = resume || undefined;
        report.strategies = strategies || undefined;
        report.observations = observations || undefined;

        const updatedReport = await report.save();

        res.status(200).json(updatedReport);
    } catch (error) {
        console.error('Erro ao atualizar relatório:', error);
        res.status(500).json({ message: 'Erro ao atualizar relatório', error: error.message });
    }
};


export const deleteReport = async (req, res) => {
    const { id } = req.params;

    try {
        const report = await Report.findByIdAndDelete(id); // Substitui findById e remove

        if (!report) {
            return res.status(404).json({ message: "Relatório não encontrado" });
        }

        res.status(200).json({ message: "Relatório excluído com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir relatório", error: error.message });
    }
};






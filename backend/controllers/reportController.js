import Report from "../models/reportsModel.js";
import Student from "../models/studentModel.js";

// Cria um relatório
export const createReport = async (req, res) => {
    const { studentId } = req.params;
    const { presenceStatus, resume, strategies, observations } = req.body;

    try {
        // Validação dos campos obrigatórios
        if (!presenceStatus || !resume) {
            return res.status(400).json({ message: "Os campos 'status de presença' e 'resumo' são obrigatórios." });
        }

        // Busca o aluno
        const student = await Student.findById(studentId).populate("workspace");

        if (!student) {
            return res.status(404).json({ message: "Aluno não encontrado." });
        }

        // Validação de permissões
        if (req.user.role !== "admin" && req.user.id !== student.workspace.owner.toString()) {
            return res.status(403).json({ message: "Acesso negado. Apenas administradores ou donos do workspace podem criar relatórios." });
        }

        // Criação do relatório
        const newReport = new Report({
            presenceStatus,
            resume,
            strategies,
            observations,
            student: studentId,
        });

        const savedReport = await newReport.save();
        res.status(201).json(savedReport);
    } catch (error) {
        console.error("Erro ao criar relatório:", error.message);
        res.status(500).json({ message: "Erro ao criar relatório", error: error.message });
    }
};

// Busca todos os relatórios
export const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find().populate("student");

        if (!reports || reports.length === 0) {
            return res.status(404).json({ message: "Nenhum relatório encontrado." });
        }

        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar relatórios", error: error.message });
    }
};

// Busca relatórios de um aluno específico
export const getReportsByStudents = async (req, res) => {
    const { studentId } = req.params;

    try {
        const reports = await Report.find({ student: studentId });

        if (!reports || reports.length === 0) {
            return res.status(404).json({ message: "Nenhum relatório encontrado para este aluno." });
        }

        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar relatórios", error: error.message });
    }
};

// Atualiza um relatório
export const updateReport = async (req, res) => {
    const { id } = req.params;
    const { presenceStatus, resume, strategies, observations } = req.body;

    try {
        // Busca o relatório com dados relacionados
        const report = await Report.findById(id).populate({
            path: "student",
            populate: {
                path: "workspace",
                select: "owner",
            },
        });

        if (!report) {
            return res.status(404).json({ message: "Relatório não encontrado." });
        }

        // Verifica permissões
        if (req.user.role !== "admin" && req.user.id !== report.student.workspace.owner.toString()) {
            return res.status(403).json({ message: "Acesso negado." });
        }

        // Atualiza apenas os campos enviados
        if (presenceStatus) report.presenceStatus = presenceStatus;
        if (resume) report.resume = resume;
        if (strategies) report.strategies = strategies;
        if (observations) report.observations = observations;

        const updatedReport = await report.save();
        res.status(200).json(updatedReport);
    } catch (error) {
        console.error("Erro ao atualizar relatório:", error.message);
        res.status(500).json({ message: "Erro ao atualizar relatório", error: error.message });
    }
};

// Deleta um relatório
export const deleteReport = async (req, res) => {
    const { id } = req.params;

    try {
        const report = await Report.findByIdAndDelete(id);

        if (!report) {
            return res.status(404).json({ message: "Relatório não encontrado." });
        }

        res.status(200).json({ message: "Relatório excluído com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir relatório", error: error.message });
    }
};

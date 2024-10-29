import Report from '../models/reportsModel.js'

export const updatePresenceStatus = async (req, res) => {
    const { reportId } = req.params
    const { presenceStatus } = req.body

    if (!['Presente', 'Ausente', 'Justificou'].includes(presenceStatus)) {
        res.status(400).json({ message: 'Status de presença inválido' })
    }

    try {
        const report = await Report.findById(reportId)

        if (!report) {
            res.status(404).json({ message: 'Relatório não encontrado' })
        }

        report.presenceStatus = presenceStatus
        await report.save()

        res.status(200).json({
            message: 'Status de presença atualizado com sucesso',
            presenceStatus,
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

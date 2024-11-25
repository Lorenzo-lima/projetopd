import mongoose from 'mongoose'

const ReportSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    presenceStatus: { type: String, enum: ['Presente', 'Ausente', 'Justificou'], default: 'Presente', required: true },
    appointmentTime: { type: String, required: true },
    resume: { type: String, required: true },
    strategies: { type: String },
    observations: { type: String },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
}, {
    timestamps: true,
    collection: 'reports',
})

const Report = mongoose.model('Report', ReportSchema)

export default Report
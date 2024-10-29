import mongoose from 'mongoose'

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    pdcode: { type: String, required: true, trim: true },
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
    reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }],
}, {
    timestamps: true,
    collection: 'students',
})

const Student = mongoose.model('Student', StudentSchema)

export default Student
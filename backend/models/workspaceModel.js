import mongoose from 'mongoose'

const WorkspaceModelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
}, {
    timestamps: true,
    collection: 'workspaces',
})

const Workspace = mongoose.model('Workspace', WorkspaceModelSchema)

export default Workspace
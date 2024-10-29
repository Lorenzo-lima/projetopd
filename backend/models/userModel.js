import mongoose from 'mongoose'
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' },
}, {
    timestamps: true,
    collection: 'users',
})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

const User = mongoose.model('User', UserSchema)

export default User
import mongoose from "mongoose";

// Função para formatar a data atual (YYYY-MM-DD)
function formatDate(date) {
    return date.toISOString().slice(0, 10);
}

const ReportSchema = new mongoose.Schema({
    presenceStatus: { 
        type: String, 
        required: true 
    },
    date: { type: Date, default: Date.now },
    dayOfWeek: { type: String },
    resume: { type: String, required: true },
    strategies: { type: String },
    observations: { type: String },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
}, {
    timestamps: true,
    collection: "reports",
});

// Hook para concatenar "presenceStatus" com a data
ReportSchema.pre("save", function (next) {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    // Concatena a presença com a data (se já não estiver formatada)
    if (!this.presenceStatus.includes(formattedDate)) {
        this.presenceStatus = `${this.presenceStatus} (${formattedDate})`;
    }

    // Define o dia da semana
    const days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    this.dayOfWeek = days[currentDate.getDay()];

    next();
});

const Report = mongoose.model("Report", ReportSchema);

export default Report;

import rateLimit from "express-rate-limit"

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite de 100 requisições
    message: 'Muitas requisições em um curto período. Tente novamente mais tarde.'
})

export default limiter
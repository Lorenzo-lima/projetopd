import axios from "axios";

const api = axios.create({
    baseURL: "https://form.pdinfinita.com.br", // URL base da API externa
    timeout: 10000, // Timeout de 10 segundos
    headers: {
        "api-key": "Rm9ybUFwaUZlaXRhUGVsb0plYW5QaWVycmVQYXJhYURlc2Vudm9sdmU=",
    },
});

export default api;

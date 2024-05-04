import { Schema, model } from "mongoose";

const personagem = new Schema({
    id: { type: Number, required: false },
    nome: { type: String, required: true },
    descricao: { type: String, required: false },
    imagem: { type: String, required: false },
})

export default model('Character', personagem)
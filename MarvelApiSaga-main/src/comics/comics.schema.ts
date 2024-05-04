import { model, Schema } from "mongoose";

const comics = new Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: false },
    dataPublicacao: { type: Date, required: true },
    capa: { type: String, required: true },
})

export default model('Comics', comics)
import {Schema, model} from 'mongoose'

const creator = new Schema({
    nome: { type: String, required: true },
    imagem: { type: String, required: true },
    comics: { type: Array, required: false, default: [] },
})

export default model('Creator', creator)
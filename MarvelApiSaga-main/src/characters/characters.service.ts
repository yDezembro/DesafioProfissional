import Personagens from "./characters.schema";
import axios from "axios";
import Constants from '../../constants';

class CharactersService {
    async create(personagem: any) {
        return await Personagens.create(personagem);
    }

    async findAll() {
        return await Personagens.find();
    }

    async findById(id: any) {
        return await Personagens.findById(id);
    }

    async update(id: any, personagem: any) {
        return await Personagens.findByIdAndUpdate(id, personagem);
    }

    async delete(id: any) {
        return await Personagens.findByIdAndDelete(id);
    }
}

export default new CharactersService()
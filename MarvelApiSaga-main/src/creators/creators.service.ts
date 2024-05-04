import Creator from './creators.schema'
import axios from "axios";
import {Request} from "express";
import Constants from "../../constants";

class CreatorsService {
    async create(creator: any) {
        return await Creator.create(creator)
    }

    async findAll() {
        return await Creator.find()
    }

    async findById(id: string) {
        return await Creator.findById(id)
    }

    async update(id: string, creator: any) {
        return await Creator.findByIdAndUpdate(id, creator)
    }

    async delete(id: string) {
        return await Creator.findByIdAndDelete(id)
    }
}

export default new CreatorsService()
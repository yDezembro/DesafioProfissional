import Comics from "./comics.schema";

class ComicsService {
    async create(comics: any) {
        return await Comics.create(comics);
    }

    async findAll() {
        return await Comics.find();
    }

    async update(id: string, comics: any) {
        return await Comics.findByIdAndUpdate(id, comics);
    }

    async delete(id: string) {
        return await Comics.findByIdAndDelete(id);
    }

    async findById(id: string) {
        return await Comics.findById(id);
    }
}

export default new ComicsService()
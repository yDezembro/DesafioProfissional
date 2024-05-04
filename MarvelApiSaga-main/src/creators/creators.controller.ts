import CreatorService from './creators.service';
import {Request, Response} from 'express';
import Constants from "../../constants";
import axios from "axios";

class CreatorsController {
    async create(req: Request, res: Response) {
        try {
            const creator = req.body;
            const response = await CreatorService.create(creator);
            res.status(201).json(response);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const response = await CreatorService.findAll();
            res.status(200).json(response);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async createMany(req: Request, res: Response) {
        try {
            const url = `${Constants.MARVEL_API_URL}/series/489/creators?${Constants.MARVEL_API_PARAMS}`
            const characters = await axios.get(url)

            const newCreators = characters.data.data.results.map((creator: any) => ({
                nome: creator.fullName,
                imagem: `${creator.thumbnail?.path}.${creator.thumbnail?.extension}`,
                comics: creator.comics.items.map((comic: any) => ({
                    nome: comic.name,
                    url: comic.resourceURI
                })),
            }))

            const response = await CreatorService.create(newCreators);
            res.status(201).json(response);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const creator = req.body;
            const response = await CreatorService.update(id, creator);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const response = await CreatorService.delete(id);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const response = await CreatorService.findById(id);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async getComics(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const creator = await CreatorService.findById(id);

            if (creator === null) {
                res.status(404).json({message: `Criador não encontrado`});
                return;
            }

            const urlComics = creator.comics?.map((comic: any) => comic.url) ?? []

            let creatorComics: any[] = []

            for (const url of urlComics) {
                const response = await axios.get(`${url}?${Constants.MARVEL_API_PARAMS}`)

                creatorComics.push(response.data.data.results.map((c: any) => ({
                        titulo: c.title,
                        isbn: c.isbn,
                        serie: c.series.name
                    }
                )))
            }

            res.status(200).json({results: creatorComics});
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async getByComicsCount(req: Request, res: Response) {
        try {
            const count = req.query.count ?? 20

            const url = `${Constants.MARVEL_API_URL}/series/489/creators?${Constants.MARVEL_API_PARAMS}`
            const creators = await axios.get(url)

            const response = creators.data.data.results.filter((creator: any) => creator.comics.available == count)

            res.status(200).json(response);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new CreatorsController()
import ComicsService from "./comics.service";
import { Request, Response } from 'express';
import Constants from "../../constants";
import axios from "axios";

class ComicsController {
    async create(req: Request, res: Response) {
        try {
            const comics = req.body;
            const response = await ComicsService.create(comics);
            res.status(201).json(response);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const response = await ComicsService.findAll();
            res.status(200).json(response);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async createMany(req: Request, res: Response) {

        const url = `${Constants.MARVEL_API_URL}/series/489/comics?${Constants.MARVEL_API_PARAMS}`
        const comics = await axios.get(url)

        const newComics = comics.data.data.results.map((comic: any) => ({
            titulo: comic.title,
            descricao: comic.description,
            capa: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
            dataPublicacao: comic.dates.find((date: any) => date.type === "onsaleDate").date,
        }))

        try {
            const response = await ComicsService.create(newComics);
            res.status(201).json(response);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const comics = req.body;
            const response = await ComicsService.update(id, comics);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const response = await ComicsService.delete(id);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const response = await ComicsService.findById(id);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async filterByLetter(req: Request, res: Response) {
        try {
            const letter = req.query.letter;

            const url = `${Constants.MARVEL_API_URL}/series/489comics?${Constants.MARVEL_API_PARAMS}`
            const comics = await axios.get(url)

            const comicsFiltradas = comics.data.data.results.filter((comic: any) => comic.title.startsWith(letter))

            res.status(200).json(comicsFiltradas);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new ComicsController()
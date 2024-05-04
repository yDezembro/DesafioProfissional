import PersonagemService from "./characters.service";
import Constants from '../../constants';
import {Request, Response} from 'express';
import axios from "axios";

class CharactersController {
    async create(req: Request, res: Response) {
        try {
            const personagem = req.body;
            const response = await PersonagemService.create(personagem);
            res.status(201).json(response);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async createMany(req: Request, res: Response) {
        try {

            const url = `${Constants.MARVEL_API_URL}/series/489/characters?${Constants.MARVEL_API_PARAMS}`
            const characters = await axios.get(url)

            const newCharacters = characters.data.data.results.map((character: any) => ({
                id: character.id,
                imagem: `${character.thumbnail?.path}.${character.thumbnail?.extension}`,
                nome: character.name,
                descricao: character.description,
            }))

            const response = await PersonagemService.create(newCharacters);
            res.status(201).json(response);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const response = await PersonagemService.findAll();
            res.status(200).json(response);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const personagem = req.body;
            const response = await PersonagemService.update(id, personagem);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const response = await PersonagemService.delete(id);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const response = await PersonagemService.findById(id);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async getStoriesByCharacterId(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const url = `${Constants.MARVEL_API_URL}/characters/${id}/stories?${Constants.MARVEL_API_PARAMS}`
            const stories = await axios.get(url)
            res.status(200).json(stories.data.data.results);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async getEventsByCharacterId(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const url = `${Constants.MARVEL_API_URL}/characters/${id}/events?${Constants.MARVEL_API_PARAMS}`
            const stories = await axios.get(url)
            res.status(200).json(stories.data.data.results.map((s:any) => ({ title: s.title, description: s.description })));
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }
}

export default new CharactersController()
import { Request, Response } from "express";
import Picture from "../models/Picture.model";
import fs from "fs";

export default {
    deleteImage: async(req: Request, res: Response) => {
        const id = req.params.id;

        try {
            const imageFound = await Picture.findById(id);

            if(!imageFound) {
                return res.status(404).json({message: "Imagem não encontrada!"});
            }

            fs.unlinkSync(imageFound.src);

            await imageFound.remove();

            return res.status(200).json({message: "Imagem deletada com sucesso!"});
        } catch(err) {
            console.log({delete_picture_error: err});
            res.status(500).json({message: "500 - Internal server error"});
        }
    },
    saveImage: async(req: Request, res: Response) => {
        const { name } = req.body;
        const file = req.file;

        if(!file) {
            return res.status(400).json({message: "Informe o arquivo para continuar"});
        }

        const picture = new Picture({
            name,
            src: file.path
        });

        try {
            await picture.save();

            return res.status(201).json({picture, message: "Imagem salva com sucesso!"});
        } catch(err) {
            console.log({picture_save_error: err});
            res.status(500).json({message: "500 - Internal server error"});
        }
    },
    allPictures: async(req: Request, res: Response) => {
        try {
            const allPicturesFinded = await Picture.find();

            return res.status(200).json(allPicturesFinded);
        } catch(err) {
            console.log({find_all_pictures_error: err});
            return res.status(500).json({message: "500 - Internal server error"});
        }
    }
};

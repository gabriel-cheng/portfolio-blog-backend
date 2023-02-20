import { Request, Response } from "express";
import Post from "../models/Blog.model";
import fs from "fs";

export default {
    deletePost: async(req: Request, res: Response) => {
        const id = req.params.id;
        const postFinded = await Post.findById(id);

        if(!postFinded) {
            return res.status(400).json({message: "Postagem não encontrada!"});
        }

        try {
            await Post.deleteOne({_id: id});
            fs.unlinkSync(postFinded.pictureSrc);

            return res.status(200).json({message: "Postagem deletada com sucesso!"});
        } catch(err) {
            console.log({delete_post_error: err});
            return res.status(500).json({message: "500 - Internal server error"});
        }
    },
    updatePost: async(req: Request, res: Response) => {
        const file = req.file;
        const id = req.params.id;
        const postFinded = await Post.findById(id);

        if(!postFinded) {
            return res.status(400).json({message: "Postagem não encontrada!"});
        }

        interface iPost {
            titulo?: string,
            ferramentas?: string[],
            status?: string,
            videoUrl?: string,
            descricao?: string,
            deploy?: string,
            repositorio?: string,
            postLinkedin?: string,
            pictureName?: string,
            pictureSrc?: string
        }

        const {
            titulo,
            ferramentas,
            status,
            videoUrl,
            descricao,
            deploy,
            repositorio,
            postLinkedin,
        } = req.body;

        const updatedPost: iPost = {
            titulo,
            ferramentas,
            status,
            videoUrl,
            descricao,
            deploy,
            repositorio,
            postLinkedin,
        };

        if(file) {
            updatedPost.pictureName = file.filename;
            updatedPost.pictureSrc = file.path;

            fs.unlinkSync(postFinded.pictureSrc);
        }

        try {
            await Post.updateOne({_id: id}, updatedPost);

            return res.status(201).json({message: "Postagem atualizada com sucesso!"});
        } catch(err) {
            console.log({update_post_error: err});
            return res.status(500).json({message: "500 - Internal server error"});
        }
    },
    createNewPost: async(req: Request, res: Response) => {
        const file = req.file;
        const {
            titulo,
            ferramentas,
            status,
            videoUrl,
            descricao,
            deploy,
            repositorio,
            postLinkedin,
            pictureName,
        } = req.body;

        const newPost = {
            titulo,
            ferramentas,
            status,
            videoUrl,
            descricao,
            deploy,
            repositorio,
            postLinkedin,
            pictureName,
            pictureSrc: file.path,
        };

        if(!titulo) {
            return res.status(400).json({message: "Você precisa informar um título!"});
        }
        if(!ferramentas) {
            return res.status(400).json({message: "Você precisa informar as ferramentas utilizadas no projeto!"});
        } else if(ferramentas.length == 0) {
            return res.status(400).json({message: "Você precisa informar pelo menos 1 ferramenta utilizada no projeto!"});
        }
        if(!status) {
            return res.status(400).json({message: "Você precisa informar o status atual do projeto!"});
        }
        if(!videoUrl) {
            return res.status(400).json({message: "Você precisa informar a URL do vídeo!"});
        }
        if(!descricao) {
            return res.status(400).json({message: "Você precisa informar a descrição do projeto!"});
        }
        if(!repositorio) {
            return res.status(400).json({message: "Você precisa informar o repositório do projeto!"});
        }
        if(!file) {
            return res.status(400).json({message: "Informe o arquivo para continuar"});
        }

        try {
            await Post.create(newPost);

            return res.status(201).json({message: "Postagem criada com sucesso!"});
        } catch(err) {
            console.log({create_post_error: err});
            return res.status(500).json({message: "500 - Internal server error"});
        }
    },
    findPostById: async(req: Request, res: Response) => {
        const id = req.params.id;

        try {
            const postFindedById = await Post.findById(id);

            if(!postFindedById) {
                return res.status(404).json({message: "Postagem não encontrada!"});
            }

            return res.status(200).json(postFindedById);
        } catch(err) {
            console.log({find_post_by_id_error: err});
            return res.status(500).json({message: "500 - Internal server error"});
        }
    },
    findAllPosts: async(req: Request, res: Response) => {
        try {
            const allPostsFinded = await Post.find();

            return res.status(200).json(allPostsFinded);
        } catch(err) {
            console.log({find_all_posts_error: err});
            return res.status(500).json({message: "500 - Internal server error"});
        }
    }
};

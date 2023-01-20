import { Request, Response } from "express";
import Post from "../models/Blog.model";

export default {
    deletePost: async(req: Request, res: Response) => {
        const id = req.params.id;
        const postFinded = await Post.findById(id);

        if(!postFinded) {
            return res.status(400).json({message: "Postagem não encontrada!"});
        }

        try {
            await Post.deleteOne({_id: id});

            return res.status(200).json({message: "Postagem deletada com sucesso!"});
        } catch(err) {
            console.log({delete_post_error: err});
            return res.status(500).json({message: "500 - Internal server error"});
        }
    },
    updatePost: async(req: Request, res: Response) => {
        const id = req.params.id;
        const postFinded = await Post.findById(id);

        if(!postFinded) {
            return res.status(400).json({message: "Postagem não encontrada!"});
        }

        const {
            titulo,
            ferramentas,
            cardBackgroundImage,
            status,
            videoUrl,
            descricao,
            deploy,
            repositorio,
            postLinkedin
        } = req.body;

        const updatedPost = {
            titulo,
            ferramentas,
            cardBackgroundImage,
            status,
            videoUrl,
            descricao,
            deploy,
            repositorio,
            postLinkedin
        };

        if(titulo == postFinded.titulo) {
            return res.status(400).json({message: "Você precisa inserir um título diferente do atual para poder atualizá-lo."});
        }
        if(ferramentas == postFinded.ferramentas) {
            return res.status(400).json({message: "Você precisa inserir uma ferramenta diferente da atual para poder atualizá-la."});
        }
        if(cardBackgroundImage == postFinded.cardBackgroundImage) {
            return res.status(400).json({message: "Você precisa inserir uma imagem diferente da atual para poder atualizá-la."});
        }
        if(status == postFinded.status) {
            return res.status(400).json({message: "Você precisa inserir um status diferente do atual para poder atualizá-lo."});
        }
        if(videoUrl == postFinded.videoUrl) {
            return res.status(400).json({message: "Você precisa inserir uma URL diferente da atual para poder atualizá-lo."});
        }
        if(descricao == postFinded.descricao) {
            return res.status(400).json({message: "Você precisa inserir uma descrição diferente da atual para poder atualizá-la."});
        }
        if(deploy == postFinded.deploy) {
            return res.status(400).json({message: "Você precisa inserir um link de deploy diferente do atual para poder atualizá-lo."});
        }
        if(repositorio == postFinded.repositorio) {
            return res.status(400).json({message: "Você precisa inserir um repositório diferente do atual para poder atualizá-lo."});
        }
        if(postLinkedin == postFinded.postLinkedin) {
            return res.status(400).json({message: "Você precisa inserir uma postagem Linkedin diferente da atual para poder atualizá-la."});
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
        const {
            titulo,
            ferramentas,
            cardBackgroundImage,
            status,
            videoUrl,
            descricao,
            deploy,
            repositorio,
            postLinkedin
        } = req.body;

        const newPost = {
            titulo,
            ferramentas,
            cardBackgroundImage,
            status,
            videoUrl,
            descricao,
            deploy,
            repositorio,
            postLinkedin
        };

        if(!titulo) {
            return res.status(400).json({message: "Você precisa informar um título!"});
        }
        if(!ferramentas) {
            return res.status(400).json({message: "Você precisa informar as ferramentas utilizadas no projeto!"});
        } else if(ferramentas.length == 0) {
            return res.status(400).json({message: "Você precisa informar pelo menos 1 ferramenta utilizada no projeto!"});
        }
        if(!cardBackgroundImage) {
            return res.status(400).json({message: "Você precisa informar o nome da imagem de background!"});
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
                return res.status(400).json({message: "Postagem não encontrada!"});
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

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.model";
import bcrypt from "bcrypt";

export default {
    login: async(req: Request, res: Response) => {
        const { username, password } = req.body;
        const user = await User.findOne({username: username});

        if(!user) {
            return res.status(404).json({message: "Usuário não encontrado!"});
        }
        if(!username) {
            return res.status(404).json({message: "O username é obrigatório!"});
        }
        if(!password) {
            return res.status(401).json({message: "A senha é obrigatória!"});
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword) {
            return res.status(400).json({message: "Senha incorreta!"});
        }

        try {
            const secret = process.env.SECRET;

            const token = jwt.sign({
                id: user._id,
                username: user.username
            }, secret);

            return res.status(200).json({message: "Autenticação relaizada com sucesso!", token: token});
        } catch(err) {
            console.log({login_error: err});
            return res.status(500).json({message: "500 - Internal server error"});
        }
    },
    deleteUser: async(req: Request, res: Response) => {
        const id = req.params.id;
        const userFinded = await User.findById(id);

        if(!userFinded) {
            return res.status(404).json({message: "Usuário não encontrado!"});
        }

        try {
            await User.deleteOne({_id: id});

            return res.status(200).json({message: "Usuário deletado com sucesso!"});
        } catch(err) {
            console.log({delete_user_error: err});
            return res.status(500).json({message: "500 - Internal server error"});
        }
    },
    updateUserPassword: async(req: Request, res: Response) => {
        const id = req.params.id;
        const { lastPassword, password } = req.body;
        const user = await User.findById(id);
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt);

        const passCompare = await bcrypt.compare(lastPassword, user.password);

        const newPassword = {
            password: hash
        };

        if(!passCompare) {
            return res.status(400).json({message: "A senha informada não coincide com a anterior!"});
        }

        try {
            await User.updateOne({_id:id}, newPassword);

            return res.status(201).json({message: "Senha atualizada com sucesso!"});
        } catch(err) {
            console.log({update_user_password_error: err});
            return res.status(500).json({message: "500 - Internal server error"});
        }
    },
    updateUser: async(req: Request, res: Response) => {
        const id = req.params.id;
        const { name, username, email } = req.body;
        const userFinded = await User.findById(id);

        const userUpdated = {
            name,
            username,
            email
        };

        if(!userFinded) {
            return res.status(404).json({message: "Usuário não encontrado!"});
        }

        try {
            await User.updateOne({_id: id}, userUpdated);

            return res.status(201).json({message: "Usuário atualizado com sucesso!"});
        } catch(err) {
            console.log({update_user_error: err});
            return res.status(500).json({message: "500 - Internal server error"});
        }
    },
    createNewUser: async(req: Request, res: Response) => {
        const { name, username, email, password, confirmPassword } = req.body;
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt);
        const emailExists = await User.findOne({email: email});
        const usernameExists = await User.findOne({username: username});

        const newUser = {
            name,
            username,
            email,
            password: hash
        };

        if(usernameExists) {
            return res.status(400).json({message: "Já existe um usuário com este username!"});
        }
        if(emailExists) {
            return res.status(400).json({message: "Já existe um usuário com este email!"});
        }

        if(!name) {
            return res.status(400).json({message: "Você precisa seu nome!"});
        }
        if(!username) {
            return res.status(400).json({message: "Você precisa inserir um nome de usuário!"});
        }
        if(!email) {
            return res.status(400).json({message: "Você precisa inserir um e-mail!"});
        }
        if(!password) {
            return res.status(400).json({message: "Você precisa inserir uma senha!"});
        }
        if(password != confirmPassword) {
            return res.status(400).json({message: "As senhas não coincidem!"});
        }

        try {
            await User.create(newUser);

            return res.status(201).json({message: "Usuário criado com sucesso!"});
        } catch(err) {
            console.log({create_user_error: err});
            return res.status(500).json({message: "500 - Internal server error"});
        }
    },
    findUserById: async(req: Request, res: Response) => {
        const id = req.params.id;
        const userFinded = await User.findById(id);

        if(!userFinded) {
            return res.status(404).json({message: "Usuário não encontrado!"});
        }

        try {
            return res.status(200).json({userFinded});
        } catch(err) {
            console.log({find_user_by_id_error: err});
            return res.status(500).json({message: "500 - Internal server error"});
        }
    },
    findAllUsers: async(req: Request, res: Response) => {
        try {
            const allUsersFinded = await User.find();

            return res.status(200).json(allUsersFinded);
        } catch(err) {
            console.log({find_all_users_error: err});
            return res.status(500).json({message: "500 - Internal server error"});
        }
    }
};

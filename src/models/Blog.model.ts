import { model, Schema } from "mongoose";

interface iPostSchema {
    titulo: string,
    ferramentas: [string],
    status: string,
    videoUrl: string,
    descricao: string,
    deploy?: string,
    repositorio: string,
    postLinkedin?: string,
    pictureName: string,
    pictureSrc: string
}

const PostSchema = new Schema<iPostSchema>({
    titulo: {type: String, required: true},
    ferramentas: {type: [String], required: true, min: 0},
    status: {type: String, required: true},
    videoUrl: {type: String, required: true},
    descricao: {type: String, require: true},
    deploy: {type: String},
    repositorio: {type: String, required: true},
    postLinkedin: {type: String},
    pictureName: {type: String, required: true},
    pictureSrc: {type: String, required: true}
});

const PostModel = model("BlogPortfolio", PostSchema);

export default PostModel;

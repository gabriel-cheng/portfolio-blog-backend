import { Schema, model } from "mongoose";

interface iPictureSchema {
    name: string,
    src: string
}

const PictureSchema = new Schema<iPictureSchema>({
    name: {type: String, required: true},
    src: {type: String, required: true}
});

const Picture = model("Picture", PictureSchema);

export default Picture;
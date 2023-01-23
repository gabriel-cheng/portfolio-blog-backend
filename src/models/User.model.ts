import { model, Schema } from "mongoose";

interface iUserModel {
    name: string,
    username: string,
    email: string,
    password: string
}

const UserSchema = new Schema<iUserModel>({
    name: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

const User = model("BloggerUser", UserSchema);

export default User;

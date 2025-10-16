import mongoose, { mongo } from "mongoose";

export const UserSchema = new mongoose.Schema({
    nombre_completo: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

export const UserModel = mongoose.model("User", UserSchema)
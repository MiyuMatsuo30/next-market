import mongoose from "mongoose"
import { stringifyCookie } from "next/dist/compiled/@edge-runtime/cookies"

const Schema = mongoose.Schema

const ItemSchema = new Schema({
    title: String,
    image: String,
    price: String,
    description: String,
    email: String,
})

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

export const ItemModel = mongoose.models.Item || mongoose.model("Item", ItemSchema)
export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema)
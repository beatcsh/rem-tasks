import { Schema, model } from "mongoose"

const usersSchema = new Schema ([
    {
        username: { type: String, required: true },
    },
    {
        email: { type: String, required: true, unique: true },
    },
    {
        pass: { type: String, required: true },
    },
    {
        avatar: { type: String, required: true },
    }
])

export const usersModel = new model('users', usersSchema)
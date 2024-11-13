import { Schema, model } from "mongoose"

const categoriesSchema = new Schema([
    {
        name: { type: String, required: true },
    },
    {
        id_user: { type: Schema.Types.ObjectId, required: true }
    }
])

export const categoriesModel = new model('categories', categoriesSchema)
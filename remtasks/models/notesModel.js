import { Schema, model } from "mongoose"

const notesSchema = new Schema([
    {
        title: { type: String, required: true },
    },
    {
        content: { type: String, required: true }
    },
    {
        status: { type: String, required: true }
    },
    {
        date_pro: { type: Date, required: true }
    },
    {
        deadline: { type: Date, required: true }
    },
    {
        id_category: { type: Schema.Types.ObjectId, required: true }
    },
    {
        id_user: { type: Schema.Types.ObjectId, required: true }
    }
])

export const notesModel = new model('notes', notesSchema)
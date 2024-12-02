import { Schema, model } from "mongoose"

const notesSchema = new Schema([
    {
        title: { type: String, required: true },
    },
    {
        content: { type: String, required: true }
    },
    {
        status: { type: String, enum: ['pending','done','in-progress'], default: 'pending' }
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

/*

{
  "title": "Express MVC",
  "content": "I'll learn that shit",
  "status": "In Progress",
  "date_pro": "2024-04-25T12:00:00Z",
  "deadline": "2024-04-30T12:00:00Z",
  
}

usuario id
6733f16935e1efce8437c8f2

  categoria id
  674a4800da1657c858098411

*/
export const notesModel = new model('notes', notesSchema)
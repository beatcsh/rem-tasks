import { notesModel } from "../models/notesModel.js"

export default {
    getAllNotes: async (req, res) => {
        try {
            const notes = await notesModel.find()

            if (!notes) return res.status(400).json({ "msg": "ni tienes notas" })

            res.status(200).send(notes)
        } catch (err) {
            console.log(err)
            res.status(500).json({ "msg": "hay algo mal" })
        }
    },
    getNotes: async (req, res) => {
        try {
            const notes = await notesModel.find({ id_user: req.query._id })

            if (!notes) return res.status(400).json({ "msg": "ni tienes notas" })

            res.status(200).send(notes)
        } catch (err) {
            console.log(err)
            res.status(500).json({ "msg": "hay algo mal" })
        }
    },
    getOneNote: async (req, res) => {
        try {

            const note = await notesModel.findOne({ title: req.body.title })
            if (!note) return res.status(400).json({ "msg": "nota no encontrada" })
            res.status(200).json(notes)

        } catch (err) {
            console.log(err)
            res.status(500).json({ "msg": "hay algo mal" })
        }
    },
    createNote: async (req, res) => {
        try {

            const { title, content, status, deadline, id_category } = req.body

            if (!title || !content || !status || !deadline || !id_category) return res.status(200).json({ "msg": "algo falto we" })

            const note = {
                title: title,
                content: content,
                status: status,
                date_pro: new Date(),
                deadline: deadline,
                id_category: id_category,
                id_user: req.query._id
            }

            await notesModel.create(note)

        } catch (err) {
            console.log(err)
            res.status(500).json({ "msg": "hay algo mal" })
        }
    },
    editNote: async (req, res) => {
        try {
            const note = await notesModel.findById(req.query._id)

            if (!note) return res.status(400).json({ "status": "nota no encontrada" })

            note.title = req.body.title ? req.body.title : note.title
            note.content = req.body.content ? req.body.content : note.content
            note.status = req.body.status ? req.body.status : note.status
            note.date_pro = req.body.date_pro ? req.body.date_pro : note.date_pro  // Si se pasa una fecha nueva, se actualiza
            note.deadline = req.body.deadline ? req.body.deadline : note.deadline
            note.id_category = req.body.id_category ? req.body.id_category : note.id_category
            note.id_user = req.body.id_user ? req.body.id_user : note.id_user

            await notesModel.findByIdAndUpdate(note._id, note)

            res.status(200).json({ "msg": "nota actualizada con éxito" })

        } catch (err) {
            console.log(err)
            res.status(500).json({ "msg": "hubo un error al actualizar la nota" })
        }
    },
    removeNote: async (req, res) => {
        try {

            const note = await notesModel.findByIdAndDelete(req.query._id)

            if (!note) return res.status(400).json({ "status": "nota no encontrada" })

            res.status(200).json({ "msg": "nota eliminada con éxito" })

        } catch (err) {
            console.log(err)
            res.status(500).json({ "msg": "hubo un error al eliminar la nota" })
        }
    }
}
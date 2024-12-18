import { notesModel } from "../models/notesModel.js"
import mongoose from "mongoose"

export default {
    getAllNotes: async (req, res) => {
        try {
            const notes = await notesModel.find()

            if (!notes) return res.status(400).json({ "msg": "ni tienes notas" })

            return res.status(200).send(notes)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ "msg": "hay algo mal" })
        }
    },
    getNotes: async (req, res) => {
        try {
            let { _id } = req.query;

            console.log("Recibiendo ID:", _id);

            // Validar si el parámetro es enviado como un objeto con `$oid`
            if (_id && _id.$oid) {
                _id = _id.$oid; // Extraer el string de $oid
            }

            // Validar si el ID es válido
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                console.log("ID no válido");
                return res.status(400).json({ error: 'ID no válido' });
            }

            const notes = await notesModel.find({ id_user: _id });

            console.log("Notas encontradas:", notes);

            if (!notes || notes.length === 0) {
                console.log("No se encontraron notas para el ID:", _id);
                return res.status(404).json({ msg: "No se encontraron notas para el usuario" });
            }

            return res.status(200).json(notes);
        } catch (error) {
            console.error("Error en la consulta de notas:", error);
            return res.status(500).json({ error: 'Error al obtener las notas' });
        }
    },
    getOneNote: async (req, res) => {
        try {

            const note = await notesModel.findOne({ title: req.body.title })
            if (!note) return res.status(400).json({ "msg": "nota no encontrada" })
            return res.status(200).json(notes)

        } catch (err) {
            console.log(err)
            return res.status(500).json({ "msg": "hay algo mal" })
        }
    },
    createNote: async (req, res) => {
        try {
            const { title, content, status, deadline, id_category } = req.body;
    
            if (!title || !content || !status || !deadline || !id_category) {
                return res.status(400).json({ "msg": "algo falto we" });
            }
    
            const userId = req.query._id && req.query._id.$oid;
    
            if (!userId) {
                return res.status(400).json({ "msg": "El ID del usuario es inválido o no fue enviado correctamente" });
            }
    
            const note = {
                title: title,
                content: content,
                status: status,
                date_pro: new Date(),
                deadline: deadline,
                id_category: id_category,
                id_user: userId, // Aquí enviamos la referencia del usuario
            };
    
            await notesModel.create(note);
    
            return res.status(200).json({ msg: "se creo la nota bien" });
    
        } catch (err) {
            console.log(err);
            return res.status(500).json({ "msg": "hay algo mal" });
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

            return res.status(200).json({ "msg": "nota actualizada con éxito" })

        } catch (err) {
            console.log(err)
            return res.status(500).json({ "msg": "hubo un error al actualizar la nota" })
        }
    },
    removeNote: async (req, res) => {
        try {

            const note = await notesModel.findByIdAndDelete(req.query._id)

            if (!note) return res.status(400).json({ "status": "nota no encontrada" })

            return res.status(200).json({ "msg": "nota eliminada con éxito" })

        } catch (err) {
            console.log(err)
            return res.status(500).json({ "msg": "hubo un error al eliminar la nota" })
        }
    }
}
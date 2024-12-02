import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import usersController from "./controllers/usersController.js"
import notesController from "./controllers/notesController.js"
import categoriesController from "./controllers/categoriesController.js"

dotenv.config()

const app = express()

mongoose.connect(process.env.URL)
    .then(() => {
        console.log("Conectado a la base de datos")
    })
    .catch((err) => {
        console.log("Error de conexión:", err)
    })

app.use(cors())
app.use(express.json())

// users routes
app.get('/users/all', usersController.getUsers)
app.post('/users/login', usersController.login)
app.post('/users/add', usersController.createUser)
app.put('/users/upd', usersController.editUser)
app.delete('/users/del', usersController.removeUser)
app.get('/users/getUser', usersController.getUser)

// notes routes
app.get('/notes/all', notesController.getNotes)
app.get('/notes/alln', notesController.getAllNotes)
app.get('/notes/one', notesController.getOneNote)
app.post('/notes/add', notesController.createNote)
app.put('/notes/upd', notesController.editNote)
app.delete('/notes/del', notesController.removeNote)

// categories routes
app.get('/categs/all', categoriesController.getCategories)
app.get('/categs/one', categoriesController.getCategory)
app.post('/categs/add', categoriesController.createCategory) // paso
app.delete('/categs/del', categoriesController.removeCategory)

app.listen(5000, () => {
    console.log('Servidor en el puerto 5000')
})
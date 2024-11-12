import { insertUser, updateUser, deleteUSer } from "../models/usersModel.js"

export const createUser = (req, res) => {
    const user = req.body 
    insertUser(user, (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).send("error al agregar")
        }
        res.status(200).send("todo bien al agregar")
    })
}

export const editUser = (req, res) => {
    const user = req.body
    updateUser(user, (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).send("error al editar")
        }
        res.status(200).send("todo bien al editar")
    })
}

export const removeUser = (req, res) => {
    const user = req.body
    deleteUSer(user, (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).send("error al borrar")
        }
        res.status(200).send("todo bien al borrar")
    })
}
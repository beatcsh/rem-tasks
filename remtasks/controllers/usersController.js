import { usersModel } from "../models/usersModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export default {
    getUsers: async (req, res) => {
        try {
            const users = await usersModel.find()
            res.status(200).json(users)
        } catch (err) {
            console.log(err)
            res.status(500).json({ "msg": "hay algo mal" })
        }
    },
    createUser: async (req, res) => {
        try {

            const { username, email, pass, avatar } = req.body

            if (!username || !email || !pass || !avatar) return res.status(400).json({ "msg": "falto algo" })

            const hash = await bcrypt.hash(req.body.pass, 10)

            const user = {
                username: username,
                email: email,
                pass: hash,
                avatar: avatar
            }

            await usersModel.create(user)
            res.status(200).json({ "msg": "todo bien al crear" })
        } catch (err) {
            console.log(err)
            res.status(500).json({ "msg": "hay algo mal" })
        }
    },
    login: async (req, res) => {
        try {

            const { username, pass } = req.body

            if (!username, !pass) return res.status(400).json({ "msg": "credenciales no validas" })
            
            const user = await usersModel.findOne({ username })

            if (!user) return res.status(400).json({ "msg": "ni existes" })

            if (!bcrypt.compare(pass, user.pass)) return res.status(400).json({ "status": "no existes" })
            
            const load = { id: user._id, username: user.username }
            const token = await jwt.sign(load, process.env.private_key)
            return res.status(200).json({ token })
            
        } catch (err) {
            console.log(err)
            res.status(500).json({ "msg": "hay algo mal" })
        }
    },
    editUser: async (req, res) => {
        try {
            const user = await usersModel.findById(req.query._id)

            if (!user) return res.status(400).json({ "status": "usuario no encontrado" })

            user.username = req.body.username ? req.body.username : user.username;
            user.email = req.body.email ? req.body.email : user.email;
            user.pass = req.body.pass ? await bcrypt.hash(req.body.pass) : user.pass;
            user.avatar = req.body.avatar ? req.body.avatar : user.avatar;
            await usersModel.findByIdAndUpdate(user._id, user)
            res.status(200).json({ "msg": "actualizado con exito" })

        } catch (err) {
            console.log(err)
            res.status(500).json({ "msg": "hay algo mal" })
        }
    },
    removeUser: async (req, res) => {
        try {

            const user = await usersModel.findByIdAndDelete(req.query._id)

            if(!user) return res.status(400).json({ "msg": "no hay nota" })

            res.status(200).json({ "msg": "se borro al wey" })

        } catch (err) {
            console.log(err)
            res.status(500).json({ "msg": "hay algo mal" })
        }
    }
}
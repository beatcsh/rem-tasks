import { categoriesModel } from "../models/categoriesModel.js"
import { usersModel } from "../models/usersModel.js"

export default {
    getCategories: async (req, res) => {
        try {

            const categories = await categoriesModel.find({ id_user: req.query._id })
            if (!categories) return res.status(400).json({ "msg": "no hay categorias del usuario" })

            return res.status(200).send(categories)

        } catch (err) {
            console.log(err)
            return res.status(500).json({ "msg": "hay pedos aqui" })
        }
    },
    getCategory: async (req, res) => {
        try {

            const category = await categoriesModel.findOne({ name: req.body.name })
            if (!category) return res.status(400).json({ "msg": "no hay categoria" })

            return res.status(200).json(category)

        } catch (err) {
            console.log(err)
            return res.status(500).json({ "msg": "hay pedos aqui" })
        }
    },
    createCategory: async (req, res) => {
        try {
            const id_user = req.query._id
            const user = await usersModel.findOne({ _id: id_user })
            if (!user) return res.status(400).json({ "msg": "no hay usuario que añada" })

            const name = req.body.name

            if (!name) res.status(400).json({ "msg": "no hay nombre pa esto" })
    
            const category = {
                name: name,
                id_user: id_user
            }

            await categoriesModel.create(category)

            return res.status(200).json({ "msg": "se creo bien" })

        } catch (err) {
            console.log(err)
            return res.status(500).json({ "msg": "hay pedos aqui" })
        }
    },
    removeCategory: async (req, res) => {
        try {
            const category = await categoriesModel.findByIDAndDelete({ id_user: req.body._id, name: req.body.name })

            if(!category) return res.status(400).json({ "msg": "no hay categoria capaz ya la borraste, revisa" })

            return res.status(200).json({ "msg": "se quito" })

        } catch (err) {
            console.log(err)
            return res.status(500).json({ "msg": "hay pedos aqui" })
        }
    }
}
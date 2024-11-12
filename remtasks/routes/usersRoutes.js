import express from "express"
import { createUser, editUser, removeUser } from "../controllers/usersController.js"

const router = express.Router()

router.post('/add', createUser)
router.put('/upd', editUser)
router.delete('/del', removeUser)

export default router
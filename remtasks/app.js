import express from "express"
import cors from "cors"
import { conn } from "./connection/connection.js"
import userRoutes from "./routes/usersRoutes.js"

const app = express()
const port = 5500
const db = conn

app.use(cors())
app.use(express.json())

app.use("/users",userRoutes)

app.get('/', (req, res) => {
    db.query("select * from users", (err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).send("no se puede consultar ahora")
        }
        res.send(results)
    })
})

app.listen(port, () => {
    console.log('servidor arranca')
})
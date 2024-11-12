import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

export const conn = mysql.createConnection(process.env.URI)

conn.connect((err) => {
    if (err) console.log('error en la conexion'+err.stack)
    console.log('conectado a la BD con ID'+conn.threadId)
})
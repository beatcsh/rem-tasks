import { conn } from "../connection/connection.js"
const db = conn

export const insertUser = (user, callback) => {
    const sql = 'insert into users values (default, ?)'
    db.query(sql, [user.name], (err, result) => {
        callback(err, result)
    })
}

export const updateUser = (user, callback) => {
    const sql = 'update users set name = ? where id = ?'
    db.query(sql, [user.name, user.id], (err, result) => {
        callback(err, result)
    })
}

export const deleteUSer = (user, callback) => {
    const sql = 'delete from users where id = ?'
    db.query(sql, [user.id], (err, result) => {
        callback(err, result)
    })
}
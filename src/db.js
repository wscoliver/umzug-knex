// db.js
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })
import knex from 'knex'

// Development Mode
let db = {}
let option = {}
if(process.env.DB_MODE == 'DEV') {
  option = {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    useNullAsDefault: true
  }
}
let connect = function () {
  let db = knex(option)
  return db
}
export default {
  connect 
}

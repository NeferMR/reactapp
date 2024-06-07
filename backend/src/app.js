import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import studentRoutes from './routes/students.js'
import dotenv from 'dotenv'

// Configura dotenv para cargar las variables de entorno desde el archivo .env
dotenv.config()

const app = express()
const PORT = process.env.PORT

// Middleware
app.use(bodyParser.json())
app.use(cors())
app.use('/students', studentRoutes)

// Conectar a MongoDB
const username = process.env.USERNAME
const password = process.env.PASSWORD
const dbname = process.env.DBNAME

const CONNECTION_URL = `mongodb+srv://${username}:${password}@db-student-grades.viuymxl.mongodb.net/${dbname}`
mongoose.connect(CONNECTION_URL)
  .then(() => {
    console.log('Conectado a MongoDB')
    app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
  })
  .catch(error => console.error(error))

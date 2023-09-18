import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import morgan from 'morgan';
import dotenv from 'dotenv';
import postRouter from './routes/postRoute';
dotenv.config()

const app = express()
const PORT = process.env.PORT
const MONGODB_URI: any = process.env.MONGODB_URI

const server = async () => {
    await mongoose.connect(MONGODB_URI).then(() => console.log('Connected to server')
    )
}
server()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())


app.use('/api', postRouter)

app.listen(PORT, () => {
    console.log(`Server is up on post ${PORT}`)

})

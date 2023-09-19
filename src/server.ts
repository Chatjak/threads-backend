import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import morgan from 'morgan';
import dotenv from 'dotenv';
import postRouter from './routes/postRoute';
import likeRouter from './routes/likeRoute';
import commentRouter from './routes/commentRoute';
import jwt from 'jsonwebtoken'
dotenv.config()

const app = express()
const PORT = process.env.PORT
const MONGODB_URI: any = process.env.MONGODB_URI

const server = async () => {
    await mongoose.connect(MONGODB_URI).then(() => console.log('Connected to server')
    )
    const decode = jwt.decode('eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..fOpT290JRJnai2Do.LsUUhDhGS9o0QsSvQVaEAFZBN_ae7Ft73JEz2jpgh4KrI4Dq-OmYv7oveWRZDXh1ypDFq8giI0j4jPCx1AgbTrBrpEHivlslXTh8TujqdBHypeZMguaQ0EsQeKpe_9Zp3ZzwJwcjG7bk-8SiQ423FpUAtJC90Ljs3dTl9kZbbkzs0fpZwTS_5KZzLiMijliigLazzqnpTsvJEIsMWCmr19KCpSfx22RnZMGuALbSQJX0MDc-k2cLHOQ9Tc7WC7e9mseI_PodoNBZhjdnUCm57m4s3kEwpk5RTx7DQUZjiKDnkq3e9G7tQ02Ignm_Nq0VkXS8v7u5W1tVxfQyXTQnJE-eqfk9xqyLe9DJUKr3rm_beSo.QLXkJDehJNrfkXOchOVa5g')
    console.log(decode);

}
server()


app.use(express.json())
app.use(morgan('dev'))
app.use(cors())



app.use('/api', postRouter)
app.use('/api', likeRouter)
app.use('/api', commentRouter)
app.listen(PORT, () => {
    console.log(`Server is up on post ${PORT}`)

})

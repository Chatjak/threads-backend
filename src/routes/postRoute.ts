import express, { Response, Request } from 'express'
const postRouter = express.Router()
import PostModal, { createPost, deletePost, getAllPost, getPostById } from '../model/post'

postRouter.post('/post/create', async (req: Request, res: Response) => {
    try {
        const post = await createPost(req.body.user, req.body.description)
        res.status(201).send(post)
    } catch (e) {
        console.log(e);
        res.status(500).send()

    }
})

postRouter.get('/post/getAll', async (req: Request, res: Response) => {
    try {
        const posts = await getAllPost()
        res.send(posts)
    } catch (e) {
        console.log(e);
        res.status(500).send()

    }
})

postRouter.delete('/post/:post_id', async (req: Request, res: Response) => {
    try {
        const post = await deletePost(req.params.post_id)
        res.send()
    } catch (e) {
        console.log(e);
        res.status(500).send()

    }
})

postRouter.get('/post/:post_id', async (req: Request, res: Response) => {
    try {
        const post = await getPostById(req.params.post_id)
        res.status(200).send(post)
    } catch (e) {
        console.log(e);
        res.status(500).send()

    }
})


export default postRouter

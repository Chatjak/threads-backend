import express, { Request, Response } from "express";
import { createComment, getComments } from "../model/comment";
const commentRouter = express.Router()


commentRouter.post('/comment/:post_id', async (req: Request, res: Response) => {
    try {

        const User = req.body.user
        const description = req.body.description
        const comment = await createComment(User, req.params.post_id, description)
        await comment.save()
        res.send(comment)

    } catch (e) {
        console.log(e);

        res.status(500).send()
    }
})

commentRouter.get('/comment/:post_id', async (req: Request, res: Response) => {
    try {
        const comments = await getComments(req.params.post_id)
        res.send(comments)
    } catch (e) {
        res.status(500).send()
    }
})


export default commentRouter
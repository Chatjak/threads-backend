import express, { Request, Response } from "express";
import LikeModel, { createLike, deleteLike, findTotalByPostId, hasLike } from "../model/like";
const likeRouter = express.Router();

likeRouter.post('/like/:post_id', async (req: Request, res: Response) => {
    try {
        const check = await LikeModel.findOne({ user_email: req.body.email, post_id: req.params.post_id })
        if (check) throw new Error()
        const like = await createLike(req.body.email, req.params.post_id)
        res.status(201).send()
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

likeRouter.delete('/like/:post_id', async (req: Request, res: Response) => {
    try {
        const check = await LikeModel.findOne({ user_email: req.body.email, post_id: req.params.post_id })
        if (!check) throw new Error()
        await deleteLike(req.body.email, req.params.post_id)
        res.status(200).send()
    } catch (e) {
        console.log(e);
        res.status(500).send()

    }
})

likeRouter.get('/like/:post_id/total', async (req: Request, res: Response) => {
    try {
        const likes = await findTotalByPostId(req.params.post_id)
        res.send(likes)

    } catch (e) {
        console.log(e);
        res.status(500).send()

    }
})


likeRouter.post('/like/:post_id/hasLike', async (req: Request, res: Response) => {
    try {
        const like = await hasLike(req.body.email, req.params.post_id)
        res.send(like)
    } catch (e) {
        console.log(e);
        res.status(500).send()

    }
})

export default likeRouter
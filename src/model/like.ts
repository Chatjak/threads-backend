import mongoose, { Document, InferSchemaType } from "mongoose";
import { Schema } from "mongoose";

const likeSchema = new Schema({
    user_email: { type: String, required: true },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
}, { timestamps: true })

export type Like = Document & InferSchemaType<typeof likeSchema>

const LikeModel = mongoose.model('Like', likeSchema)

export default LikeModel

export const hasLike = async (email: string, post_id: string) => {
    const like = await LikeModel.findOne({ user_email: email, post_id: post_id });
    if (!like) return false
    else return true
}

export const findTotalByPostId = async (post_id: string) => {
    const likes = await LikeModel.find({ post_id: post_id })
    if (!likes) return 0

    const total = likes.length;
    return total.toString()
}

export const createLike = async (email: string, post_id: string) => {
    const like = new LikeModel({
        user_email: email,
        post_id: post_id
    })
    try {
        await like.save()
        return like
    } catch (e) {
        throw new Error()
    }
}

export const deleteLike = async (email: string, post_id: string) => {
    const like = await LikeModel.findOneAndDelete({
        user_email: email,
        post_id: post_id
    })
    return
}
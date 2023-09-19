import mongoose, { Document, InferSchemaType } from "mongoose";
import { Schema } from "mongoose";
import { user } from "../types/user";


const commentSchema = new Schema({
    user:
    {
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    description: { type: String, required: true }
}, { timestamps: true })

export type Comment = Document & InferSchemaType<typeof commentSchema>

const CommentModel = mongoose.model('Comment', commentSchema)

export const createComment = async (User: any, post_id: string, description: string) => {
    const comment = new CommentModel({
        user: { email: User.email, name: User.name, image: User.image },
        post_id: post_id,
        description: description
    })
    try {
        await comment.save()
        return comment
    } catch (e) {
        throw new Error()
    }
}

export const getComments = async (post_id: string) => {
    const comments = await CommentModel.find({ post_id: post_id }).sort({ createdAt: -1 })
    return comments

}
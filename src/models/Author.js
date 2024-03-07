import { Schema, model } from "mongoose";


const AuthorSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        nationatily: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Author = model('Author', AuthorSchema)

export default Author
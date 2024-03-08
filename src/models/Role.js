import { Schema, model } from "mongoose";


const RoleSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
       id: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Book = model('Book', BookSchema)

export default Book
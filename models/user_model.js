import mongoose from "mongoose";

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    blog: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Blogs",
            required: true
        }
    ]
})

export default mongoose.model("Users", userSchema)
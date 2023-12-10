import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        unique: true,
        required: true,
    },
    list: [{
        type: mongoose.Types.ObjectId,
        ref: "List",
    }]
})

export default mongoose.model("User", userSchema)
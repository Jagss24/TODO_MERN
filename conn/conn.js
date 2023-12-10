import mongoose from "mongoose";

const conn = async (req, res) => {
    try {
        await mongoose.connect("mongodb+srv://jagss:jagu12@cluster0.zrvhtoi.mongodb.net/").then(() => {
            console.log("MongoDB cloud connected")
        })
    } catch (error) {
        console.log(error)
    }
}

export default conn()
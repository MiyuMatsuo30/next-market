import mongoose from "mongoose"

const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://matsuo30m:matsuo0830@cluster0.36ha3.mongodb.net/nextAppDataBase?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Success: Connected to MongoDB")
    } catch {
        console.log("Failure: Uconnected to MongoDB")
        throw new Error()
    }
}

export default connectDB
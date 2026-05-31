import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.warn("MONGO_URI is not set; skipping MongoDB connection")
            return null
        }

        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log (`MongoDB connected:${conn.connection.host}`)
    } catch (error){
        console.log("Error connecting to MONGODB", error.message)
        return null
    }
}
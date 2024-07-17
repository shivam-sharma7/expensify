import mongoose from "mongoose";
 

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(()=> console.log("Connected to the database"))
        .catch((error) => console.log("Error connecting to the database", error))
    } catch (error) {
        console.log("Error connecting to the database", error)
        process.exit(1)
    }
}

export default connectDB;
import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Conectado a la base de datos.");
        await mongoose.connection.dropDatabase()
    } catch (error) {
        console.log("Error al conectar con la base de datos");
    }
}
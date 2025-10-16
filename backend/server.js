import app from "./app.js";
import "dotenv/config"
import { connectDB } from "./src/config/database.js";
const PORT = process.env.PORT || 3000

app.listen(PORT, async()=>{
    try {
        await connectDB()
        console.log(`Servidor corriendo en http://localhost:3000`);
    } catch (e) {
        console.log("Error al correr el servidor:", e);
    }
})
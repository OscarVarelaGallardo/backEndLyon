import mongoose from "mongoose";

const conectarDB = async () => {
    
    try {
        const connection = await mongoose.connect('mongodb+srv://lyonacount:lyondb@cluster0.cx2tupf.mongodb.net/');
        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(`MongoDB conectado: ${url}`)
     
    } catch (error) {
        console.log(`error: ${error.message}`)
        process.exit(1)
    }
}

export default conectarDB;
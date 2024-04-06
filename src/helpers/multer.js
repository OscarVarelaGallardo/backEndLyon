import multer from "multer";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// Crea un cliente Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Configura multer para manejar la subida de archivos
const storage = multer.memoryStorage();

const upload = multer({ storage }).single('file'); // Se asume que solo se está subiendo un solo archivo

async function handleFileUpload(req, res, next) {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Si no se subió un archivo, pasar al siguiente middleware
        if (!req.file) {
            next();
            return;
        }

        // Cambiar el nombre del archivo
        let typeFile = req.file.mimetype.split("/")[1]
        let bucket = "";

        req.file.originalname = Date.now() + path.extname(req.file.originalname);

        if (typeFile === "png" || typeFile === "jpg" || typeFile === "jpeg") {
            bucket = "img"
        }

        if (typeFile === "pdf") {
            bucket = "pdf"
        }

        // Si se subió correctamente, almacenar el archivo en Supabase
        const { data, error } = await supabase.storage.from(bucket).upload(req.file.originalname, req.file.buffer);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        //como le paso el url de la imagen a la base de datos
        req.fileUrl = data.Key;
        next();
    });
}

export default handleFileUpload;
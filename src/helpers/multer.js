import multer from "multer";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// Crea un cliente Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Configura multer para manejar la subida de archivos
const storage = multer.memoryStorage();

const upload = multer({ storage }).single('image'); // Se asume que solo se está subiendo un solo archivo

async function handleFileUpload(req, res, next) {
    try {
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                // Manejar errores de Multer
                return res.status(400).json({ error: err.message });
            } else if (err) {
                // Manejar otros errores
                return res.status(500).json({ error: err.message });
            }

            // Si no se subió un archivo, pasar al siguiente middleware
            if (!req.file) {
                next();
                return;
            }

            // Cambiar el nombre del archivo
            req.file.originalname = Date.now() + path.extname(req.file.originalname);

            // Si se subió correctamente, almacenar el archivo en Supabase
            const file = req.file;
            const { data, error } = await supabase.storage.from('img').upload(file.originalname, file.buffer, {
                contentType: file.mimetype,
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            // Pasar al siguiente middleware
            next();
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export default handleFileUpload;

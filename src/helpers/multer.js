import multer from "multer";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  
    destination: function (req, file, cb, ) {
        if (file.fieldname === 'image') {
            cb(null, path.join(__dirname, '..', '..', 'public',));
            
        }
        if (file.fieldname === 'file') {
            cb(null, path.join(__dirname, '..', '..', 'public', 'excel'));
        }
        if (file.fieldname === 'pdf') {
            cb(null, path.join(__dirname, '..', '..', 'public', 'pdf'));
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }


});

const upload = multer({ storage });

export { upload }
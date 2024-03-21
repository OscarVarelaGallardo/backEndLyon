import mongoose from 'mongoose';

const RolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Rol = mongoose.model('Rol', RolSchema);

export default Rol;
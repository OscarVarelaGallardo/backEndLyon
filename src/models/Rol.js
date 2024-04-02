import mongoose from 'mongoose';

const RolSchema = new mongoose.Schema({
    id_rol: {
        type: Number,
        required: true
    },

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
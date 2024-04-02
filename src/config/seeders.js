
import Category from '../models/Category.js';
import Rol from '../models/Rol.js';
import { exit } from 'process';

const seeders = async () => {
    try {
        const countCategory = await Category.countDocuments();
        if (countCategory === 0) {
            await Category.insertMany([
                { name: 'Electronics', description: 'All electronics products', createdAt: new Date(), updatedAt: new Date(), status: true },
                { name: 'Books', description: 'All books', createdAt: new Date(), updatedAt: new Date(), status: true },
                { name: 'Clothes', description: 'All clothes', createdAt: new Date(), updatedAt: new Date(), status: true }
            ]);
        }
        const countRol = await Rol.countDocuments();
        if (countRol === 0) {
            await Rol.insertMany([
                { id_rol: "1", name: 'Admin', description: 'Este rol es para los administradores' },
                { id_rol: "2", name: 'User', description: 'Este rol es para los usuarios' },
                { id_rol: "3", name: 'Company', description: 'Este rol es para las empresas' },


            ]);
        }

    } catch (error) {
        console.log(error);
    }
}
const deleteSeeders = async () => {
    try {
        await Promise.all([Category.destroy({ where: {}, truncate: true }), Rol.destroy({ where: {}, truncate: true })]);
        console.log('Seeders deleted successfully');
        exit();
    } catch (error) {
        console.log(error);
    }
}

if (process.argv[2] === '-i') {
    seeders();
}
if (process.argv[2] === '-d') {
    deleteSeeders();
}

export default seeders;
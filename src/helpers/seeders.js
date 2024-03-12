
import Category  from '../models/Category.js';
import  Rol  from '../models/Rol.js';

const seeders = async () => {
    try {
        const count = await Category.count();
        if (count > 0) return;
        await Category.bulkCreate([
            { name: 'Electronics', description: 'All electronics products' },
            { name: 'Clothes', description: 'All clothes products' },
            { name: 'Books', description: 'All books products' },
            { name: 'Furniture', description: 'All furniture products' },
        ]);
        await Rol.bulkCreate([
            { name: 'admin' },
            { name: 'user' }
        ]);
        console.log('Seeders run successfully');
    } catch (error) {
        console.log(error);
    }
}

export default seeders;
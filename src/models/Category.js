import db from '../config/db.js'
import DataType from 'sequelize'

const Category = db.define('category',{
    id:{
        type: DataType.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{   
        type:DataType.STRING,
        allowNull:false
    },
    description:{
        type:DataType.STRING,
        allowNull:false
    },
    createdAt:{
        type:DataType.DATE,
        allowNull:false,
        defaultValue:DataType.NOW
    },
    updatedAt:{
        type:DataType.DATE,
        allowNull:false
    },
    status:{
        type:DataType.BOOLEAN,
        allowNull:false,
        defaultValue:true
    }


})
/* Category.sync({force:true}).then(()=>{
    console.log('Tabla Category sincronizada')
}
) */
Category.asociate = (models) => {
    Category.hasMany(models.Products, {
        foreignKey: 'category_id',
        onDelete: 'CASCADE'
    })
}

export default Category;
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
const options = {
  
    definition: {
       openapi: "3.0.2",
       tags: [
           {
               name: "User",
               description: "User routes documentation to login and register"
           },
           {
                name: "Product",
                description: "Product routes documentation to create, update, delete and get products"
              },
              {
                name: "Category",
                description: "Category routes documentation to create, update, delete and get categories"
              },
              {
                name: "Coment",
                description: "Coment routes documentation to create, update, delete and get coments"
              },
              {
                name: "Companies",
                description: "Companies routes documentation to create, update, delete and get companies"
              },
              {
                name: "Rol",
                description: "Rol routes documentation to create, update, delete and get rols"
           }
         
       ],
         info: {
              title: "Documentation LYON API /Express /JavaScript",
              version: "1.0.0",
              description: "API documentation"
         },
            servers: [
                {
                    url: "https://backendlyon.onrender.com/docs",
                    description:'Servidor de producción'
                }
            ]
    },
    basePath: "/",
    apis: ['./src/routes/*.js']

};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) =>{
    app.use('/docs', swagger.serve, swaggerUi.setup(swaggerSpec));
    app.get('/docs.json', (req, res) =>{
        res.setHeader("Content-Type","aplication/json");
        res.send(swaggerSpec);
    });
    console.log(
        'version 1 docs are available at http://localhost:${port}/docs'
    );
};

    
export default swaggerSpec;
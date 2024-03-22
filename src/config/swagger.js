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
         
       ],
         info: {
              title: "Documentation LYON API /Express /JavaScript",
              version: "1.0.0",
              description: "API documentation"
         },
            servers: [
                {
                    url: "https://backendlyon.onrender.com",
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
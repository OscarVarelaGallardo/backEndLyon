import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  
    swaggerDefinition: {
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
                    url: "http://localhost:3000",
                   
                }
            ]
    },
    basePath: "/",
    apis: ['./src/routes/userRoutes.js']

};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
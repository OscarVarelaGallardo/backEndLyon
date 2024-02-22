# Backend Lyon

Welcome to the Backend Lyon repository! This repository contains the backend code for the Lyon project. Lyon is a web application that aims to provide a seamless and efficient experience for users in Lyon, France.

## Features

- User authentication and authorization
- Data storage and retrieval
- API endpoints for interacting with the frontend
- Integration with external services

## Getting Started

To get started with the Backend Lyon project, follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies using `npm install`.
3. Configure the environment variables for your development environment.
4. Run the application using `npm start`.

## Contributing

We welcome contributions from the community! If you would like to contribute to the Backend Lyon project, please follow our [contribution guidelines](CONTRIBUTING.md) and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

If you have any questions or suggestions regarding the Backend Lyon project, please feel free to reach out to us at [oscar_varela_gallardo@hotmail.com]
(oscar_varela_gallardo@hotmail.com).


Levantar docker con postgres
```
Comando para levantar un contenedor de postgres con docker
docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```
Inicializar el docker con la base de datos
```
Comando para inicializar la base de datos
docker-compose up -d database

Comando para validar si esta corriendo la base de datos

 docker-compose ps
```

Conectarse a la base de datos
```
docker-compose exec database bash
```
conectarse a la base de datos
```
psql -h localhost -d "nombreDB" -U "usuario"
```
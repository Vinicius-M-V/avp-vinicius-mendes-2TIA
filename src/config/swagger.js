import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Listagem de Herois DC",
        version: "1.0.0",
        description: "API para listar, cadastrar, atualizar e remover heróis da DC."
    },
    servers: [
        {
            url: "http://localhost:1938",
            description: "Servidor local de desenvolvimento"
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                description: "Informe o token no formato: Bearer TOKEN"
            }
        },
        schemas: {
            Heroi: {
                type: "object",
                required: ["id", "nome", "primeiraAparição"],
                properties: {
                    id: {
                        type: "integer",
                        example: 1
                    },
                    nome: {
                        type: "string",
                        example: "Batman"
                    },
                    primeiraAparição: {
                        type: "integer",
                        example: 1939
                    }
                }
            },
            HeroiInput: {
                type: "object",
                required: ["nome", "primeiraAparição"],
                properties: {
                    nome: {
                        type: "string",
                        example: "Batman"
                    },
                    primeiraAparição: {
                        type: "integer",
                        example: 1939
                    }
                }
            },
            HeroiUpdate: {
                type: "object",
                properties: {
                    nome: {
                        type: "string",
                        example: "Batman"
                    },
                    primeiraAparição: {
                        type: "integer",
                        example: 1939
                    }
                }
            },
            ErrorResposta: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        example: "Herói não encontrado"
                    }
                }
            }
        }
    }
};

const swaggerOptions = {
    definition: swaggerDefinition,
    apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
import express from "express";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();
const port = 1938;

app.use(express.json());

const herois = [
  { id: 1, nome: "Superman", primeiraAparição: 1938 },
  { id: 2, nome: "Batman", primeiraAparição: 1939 },
  { id: 3, nome: "Wonder Woman", primeiraAparição: 1941 },
  { id: 4, nome: "Flash", primeiraAparição: 1940 },
  { id: 5, nome: "Aquaman", primeiraAparição: 1941 },
  { id: 6, nome: "Green Lantern", primeiraAparição: 1940 },
  { id: 7, nome: "Cyborg", primeiraAparição: 1980 },
  { id: 8, nome: "Shazam", primeiraAparição: 1940 },
  { id: 9, nome: "Martian Manhunter", primeiraAparição: 1955 },
  { id: 10, nome: "Green Arrow", primeiraAparição: 1941 },
  { id: 11, nome: "Hawkgirl", primeiraAparição: 1941 },
  { id: 12, nome: "Black Canary", primeiraAparição: 1947 },
  { id: 13, nome: "Nightwing", primeiraAparição: 1940 },
  { id: 14, nome: "Red Robin", primeiraAparição: 1940 },
  { id: 15, nome: "Booster Gold", primeiraAparição: 1986 },
  { id: 16, nome: "Firestorm", primeiraAparição: 1961 },
  { id: 17, nome: "Atom", primeiraAparição: 1961 },
  { id: 18, nome: "Doctor Fate", primeiraAparição: 1940 },
  { id: 19, nome: "Blue Beetle", primeiraAparição: 1939 },
  { id: 20, nome: "Catwoman", primeiraAparição: 1940 },
  { id: 21, nome: "Raven", primeiraAparição: 1980 },
  { id: 22, nome: "Starfire", primeiraAparição: 1980 },
  { id: 23, nome: "Beast Boy", primeiraAparição: 1980 },
  { id: 24, nome: "Supergirl", primeiraAparição: 1959 },
  { id: 25, nome: "Kid Flash", primeiraAparição: 1986 },
  { id: 26, nome: "Static", primeiraAparição: 1993 },
  { id: 27, nome: "Oracle", primeiraAparição: 1988 },
  { id: 28, nome: "Red Tornado", primeiraAparição: 1960 },
  { id: 29, nome: "Zatanna", primeiraAparição: 1964 },
  { id: 30, nome: "Batgirl", primeiraAparição: 1967 },
];

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
  apis: ["./server.js"]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

function autenticar (req, res, next) {
  const authHeader = req.headers.authorization;
  const tokenSecret = process.env.TOKEN_SECRETO;

  if (authHeader !== `Bearer ${tokenSecret}`) {
    return res.status(401).json({erro: "Acesso não autorizado. Token ausente ou invalido"});
  }

  next();
};

app.get("/", (req, res) => {
  res.json({
    mensagem: "Servidor Express funcionando!",
    disciplina: "Desenvolvimento de Websites",
    bimestre: "3º bimestre"
  });
});

/**
 * @swagger
 * /herois:
 *   get:
 *     summary: Listar todos os heróis
 *     description: Retorna a lista completa de heróis cadastrados na API.
 *     tags: [Heroi]
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 nome: Superman
 *                 primeiraAparição: 1938
 *               - id: 2
 *                 nome: Batman
 *                 primeiraAparição: 1939
 */
app.get("/herois", (req, res) => {
  res.json(herois);
});

/**
 * @swagger
 * /herois/{id}:
 *   get:
 *     summary: Buscar herói por ID
 *     description: Pesquisa um herói específico pelo código informado na URL.
 *     tags: [Heroi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador do herói.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Herói encontrado com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               nome: Superman
 *               primeiraAparição: 1938
 *       404:
 *         description: Herói não encontrado.
 *         content:
 *           application/json:
 *             example:
 *               message: Herói não encontrado
 */
app.get("/herois/:id", (req, res) => {
  const id = Number(req.params.id);
  const heroi = herois.find((heroi) => heroi.id === id);

  if (!heroi) {
    return res.status(404).json({
      message: "Herói não encontrado"
    });
  }

  res.json(heroi);
});

/**
 * @swagger
 * /herois:
 *   post:
 *     summary: Cadastrar um novo herói
 *     description: Cria um novo registro de herói na lista. Esta rota é protegida por token.
 *     tags: [Heroi]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HeroiInput'
 *           examples:
 *             exemplo:
 *               summary: Cadastro de herói
 *               value:
 *                 nome: Aquaman
 *                 primeiraAparição: 1941
 *     responses:
 *       201:
 *         description: Herói cadastrado com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Herói cadastrado com sucesso
 *               heroi:
 *                 id: 31
 *                 nome: Aquaman
 *                 primeiraAparição: 1941
 *       400:
 *         description: Dados inválidos no corpo da requisição.
 *         content:
 *           application/json:
 *             example:
 *               message: Dados inválidos
 *       401:
 *         description: Token ausente ou inválido.
 *         content:
 *           application/json:
 *             example:
 *               erro: Acesso não autorizado. Token ausente ou invalido
 */
app.post("/herois", autenticar, (req, res) => {
  const { nome, primeiraAparição } = req.body;

  if (!nome || primeiraAparição === undefined) {
    return res.status(400).json({ message: "Dados inválidos" });
  }

  const novoHerói = {
    id: herois.length + 1,
    nome,
    primeiraAparição
  };

  herois.push(novoHerói);

  res.status(201).json({
    mensagem: "Herói cadastrado com sucesso",
    heroi: novoHerói
  });
});

/**
 * @swagger
 * /herois/{id}:
 *   patch:
 *     summary: Atualizar parcialmente um herói
 *     description: Altera apenas os campos enviados pelo cliente. Esta rota é protegida por token.
 *     tags: [Heroi]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador do herói que será atualizado.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HeroiUpdate'
 *           examples:
 *             exemplo:
 *               summary: Atualização parcial
 *               value:
 *                 nome: Batman
 *                 primeiraAparição: 1939
 *     responses:
 *       200:
 *         description: Herói atualizado com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               nome: Batman
 *               primeiraAparição: 1939
 *       400:
 *         description: Dados inválidos no corpo da requisição.
 *         content:
 *           application/json:
 *             example:
 *               message: Dados inválidos
 *       401:
 *         description: Token ausente ou inválido.
 *         content:
 *           application/json:
 *             example:
 *               erro: Acesso não autorizado. Token ausente ou invalido
 *       404:
 *         description: Herói não encontrado.
 *         content:
 *           application/json:
 *             example:
 *               message: Herói não encontrado
 */
app.patch("/herois/:id", autenticar, (req, res) => {
  const id = Number(req.params.id);
  const { nome, primeiraAparição } = req.body;

  const heroi = herois.find((heroi) => heroi.id === id);

  if (!heroi) {
    return res.status(404).json({
      message: "Herói não encontrado"
    });
  }

  if (nome === undefined && primeiraAparição === undefined) {
    return res.status(400).json({ message: "Dados inválidos" });
  }

  if (nome) {
    heroi.nome = nome;
  }

  if (primeiraAparição !== undefined) {
    heroi.primeiraAparição = primeiraAparição;
  }

  res.json(heroi);
});

/**
 * @swagger
 * /herois/{id}:
 *   delete:
 *     summary: Excluir um herói
 *     description: Remove um herói da lista pelo ID informado. Esta rota é protegida por token.
 *     tags: [Heroi]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador do herói que será removido.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Herói removido com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               message: Herói removido com sucesso
 *       401:
 *         description: Token ausente ou inválido.
 *         content:
 *           application/json:
 *             example:
 *               erro: Acesso não autorizado. Token ausente ou invalido
 *       404:
 *         description: Herói não encontrado.
 *         content:
 *           application/json:
 *             example:
 *               message: Herói não encontrado
 */
app.delete("/herois/:id", autenticar, (req, res) => {
  const id = Number(req.params.id); 
  const heroiExiste = herois.findIndex((heroi) => heroi.id === id);

  if (heroiExiste === -1) {
    return res.status(404).json({
      message: "Herói não encontrado"
    });
  }

  herois.splice(heroiExiste, 1);

  res.json({
    message: "Herói removido com sucesso"
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

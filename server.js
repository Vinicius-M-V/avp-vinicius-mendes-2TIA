import express from "express";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/config/swagger.js";
import heroisRoutes from "./src/routes/heroisRoutes.js";
import prisma from "./src/config/prisma.js";

const app = express();
const port = 1938;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({
    mensagem: "Servidor Express funcionando!",
    disciplina: "Desenvolvimento de Websites",
    bimestre: "3º bimestre"
  });
});

app.use("/herois", heroisRoutes);

try {
  await prisma.$connect()

  console.log("Conexão com o banco de dados estabelecida com sucesso!");
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
} catch (error) {
  console.error("Erro ao conectar ao banco de dados:", error.message);

  await prisma.$disconnect();

  process.exitCode = -1;
}



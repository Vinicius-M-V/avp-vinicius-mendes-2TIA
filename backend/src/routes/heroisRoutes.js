import express from 'express'
import {
    atualizarHeroi,
    buscarHeroiporId,
    deletarHeroi,
    listarHerois,
    postarHeroi
} from '../controllers/heroisController.js';
import autenticar from '../middlewares/autenticar.js';

const router = express.Router();

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
router.get("/", listarHerois);

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
router.get("/:id", buscarHeroiporId);

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
router.post("/", autenticar, postarHeroi);

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
router.patch("/:id", autenticar, atualizarHeroi);

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
router.delete("/:id", autenticar, deletarHeroi);

export default router;
import * as heroisModel from "../models/heroisModel.js";

export async function listarTodos(req, res) {
    const herois = await heroisModel.listarTodos();
    res.json(herois);
}

export async function buscarHeroiporId(req, res) {
    const id = Number(req.params.id);
    const heroi = await heroisModel.buscarPorId(id);

    if (!heroi) {
        return res.status(404).json({
            message: "Herói não encontrado"
        });
    }

    res.json(heroi);
}

export async function cadastrarHeroi(req, res) {
    const { nome, primeiraAparicao } = req.body;

    const heroi = await heroisModel.criar({
        nome, primeiraAparicao
    });

    res.status(201).json({
        mensagem: "Herói cadastrado com sucesso",
        heroi: novoHerói
    });
}

export async function atualizarHeroi(req, res) {
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
}

export function deletarHeroi(req, res) {
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
}
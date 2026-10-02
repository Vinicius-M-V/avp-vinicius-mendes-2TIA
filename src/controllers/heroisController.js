import herois from "../data/herois.js";

export function listarHerois(req, res) {
    res.json(herois);
}

export function buscarHeroiporId(req, res) {
    const id = Number(req.params.id);
    const heroi = herois.find((heroi) => heroi.id === id);

    if (!heroi) {
        return res.status(404).json({
            message: "Herói não encontrado"
        });
    }

    res.json(heroi);
}

export function postarHeroi(req, res) {
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
}

export function atualizarHeroi(req, res) {
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
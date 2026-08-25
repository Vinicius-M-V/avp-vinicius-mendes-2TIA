import express from "express";

const app = express();
const port = 1610;

app.use(express.json());

const alunos = [
  { id: 1, nome: "Augusto", turma: "2TIB" },
  { id: 2, nome: "Gustavo", turma: "2TIB" },
  { id: 3, nome: "Rayssa", turma: "2TIB" },
  { id: 4, nome: "Amanda", turma: "2TIB" },
  { id: 5, nome: "Marcos", turma: "2TIB" },
  { id: 6, nome: "Michelly", turma: "2TIB" },
  { id: 7, nome: "Maria Fernanda", turma: "2TIB" },
  { id: 8, nome: "Fellype", turma: "2TIB" }
];

const herois = [
  { id: 1, nome: "Spider-Man", equipe: "Solo" },
  { id: 2, nome: "Wolverine", equipe: "X-Men" },
  { id: 3, nome: "Captain America", equipe: "Avengers" },
  { id: 4, nome: "Iron Man", equipe: "Avengers" },
  { id: 5, nome: "Hulk", equipe: "Avengers" },
  { id: 6, nome: "Storm", equipe: "X-Men" },
  { id: 7, nome: "Thor", equipe: "Avengers" },
  { id: 8, nome: "Mr. Fantastic", equipe: "Fantastic Four" },
  { id: 9, nome: "Invisible Woman", equipe: "Fantastic Four" },
  { id: 10, nome: "Human Torch", equipe: "Fantastic Four" },
  { id: 11, nome: "The Thing", equipe: "Fantastic Four" },
  { id: 12, nome: "Cyclops", equipe: "X-Men" },
  { id: 13, nome: "Jean Grey", equipe: "X-Men" },
  { id: 14, nome: "Daredevil", equipe: "Solo" },
  { id: 15, nome: "Black Panther", equipe: "Avengers" },
  { id: 16, nome: "Carol Danvers", equipe: "Avengers" },
  { id: 17, nome: "Deadpool", equipe: "X-Force" },
  { id: 18, nome: "Doctor Strange", equipe: "The Defenders" },
  { id: 19, nome: "Hawkeye", equipe: "Avengers" },
  { id: 20, nome: "Black Widow", equipe: "S.H.I.E.L.D." },
  { id: 21, nome: "Scarlet Witch", equipe: "Avengers" },
  { id: 22, nome: "Wasp", equipe: "Avengers" },
  { id: 23, nome: "Iceman", equipe: "X-Men" },
  { id: 24, nome: "Beast", equipe: "X-Men" },
  { id: 25, nome: "Luke Cage", equipe: "The Defenders" },
  { id: 26, nome: "Colossus", equipe: "X-Men" },
  { id: 27, nome: "Nightcrawler", equipe: "X-Men" },
  { id: 28, nome: "Punisher", equipe: "Solo" },
  { id: 29, nome: "She-Hulk", equipe: "Avengers" },
  { id: 30, nome: "Emma Frost", equipe: "X-Men" },
];

app.get("/", (req, res) => {
  res.json({
    mensagem: "Servidor Express funcionando!",
    disciplina: "Desenvolvimento de Websites",
    bimestre: "3º bimestre"
  });
});

app.get("/herois", (req, res) => {
  res.json(herois);
});

app.patch("/herois/:id", (req, res) => {
  const id = Number(req.params.id);

  const {nome, equipe} = req.body;

  const heroi = herois.find((heroi) => heroi.id === id);

  if (!heroi) {
    return res.status(404).json({
      message: "Herói não encontrado"
    });
  }

  if (nome) {
    heroi.nome = nome;
  }

  if (equipe) {
    heroi.equipe = equipe;
  }

  res.json(heroi);
});

app.delete("/herois/:id", (req, res) => {
  const id = Number(req.params.id);

  const heroiExiste = herois.find((heroi) => heroi.id === id);

  if (!heroiExiste) {
    return res.status(404).json({
      message: "Herói não encontrado"
    });
  }

herois.splice(heroiExiste, 1);

  res.json({
    message: "Herói removido com sucesso"
  });
});

app.post("/herois", (req, res) => {
  const novoHerói = {
    id: herois.length + 1,
    nome: req.body.nome,
    equipe: req.body.equipe
  };

  herois.push(novoHerói);

  res.status(201).json({
    mensagem: "Herói cadastrado com sucesso",
    heroi: novoHerói
  });
});

app.post("/alunos", (req, res) => {
  const novoAluno = {
    id: alunos.length + 1,
    nome: req.body.nome,
    turma: req.body.turma
  };

  alunos.push(novoAluno);

  res.status(201).json({
    mensagem: "Aluno cadastrado com sucesso",
    aluno: novoAluno
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

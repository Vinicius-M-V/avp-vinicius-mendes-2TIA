import prisma from '../config/prisma.js';

export async function criar({ nome, primeiraAparicao }) {
    return prisma.heroi.create({
        data: {
            nome,
            primeiraAparicao
        }
    })
}

export async function listarTodos() {
    return prisma.heroi.findMany({
        orderBy: {
            id: 'asc'
        }
    });
}
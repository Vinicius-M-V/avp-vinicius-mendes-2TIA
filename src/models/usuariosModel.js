import prisma from '../config/prisma.js';

export function criar({ nome, email, senhaHash }) {
    return prisma.herois.create({
        data: {
            nome,
            email,
            senhaHash
        },

        select: {
            id: true,
            nome: true,
            senhaHash: true
        }
    });
}

export function buscarPorEmail(email) {
    return prisma.herois.findUnique({
        where: {
            email
        },
    });
}


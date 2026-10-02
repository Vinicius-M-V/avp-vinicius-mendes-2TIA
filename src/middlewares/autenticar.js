export default function autenticar(req, res, next) {
    const authHeader = req.headers.authorization;
    const tokenSecret = process.env.TOKEN_SECRETO;

    if (authHeader !== `Bearer ${tokenSecret}`) {
        return res.status(401).json({
            erro: "Acesso não autorizado. Token ausente ou invalido"
        });
    }

    next();
};

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    res.set('Cache-Control', 'no-store');
    let token = req.headers.authorization?.split(" ")[1] || req.cookies["tokenJWT"];
    if (!token) {
        return res.status(401).json({ erro: "Token não fornecido" });
    }
    
    jwt.verify(token, 'chave_secreta', (err, user) => {
        if (err) {
            console.error("Erro ao verificar token:", err);
            return res.status(401).json({ erro: "Token inválido ou expirado" });
        }
        req.id = user.id;
        console.log("Usuário autenticado:", user);
        next();
    });
};


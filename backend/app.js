const express = require('express');
const jwt = require('jsonwebtoken');
const router = require('./src/routes/routes');
const cookieParser = require('cookie-parser');
require('dotenv').config();

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json()); 
        this.server.use(express.urlencoded({ extended: true })); 
        this.server.use(cookieParser());

        this.server.use((req, res, next) => {
            res.set('Cache-Control', 'no-store');
            let token = req.cookies["tokenJWT"];
            jwt.verify(token, 'chave_secreta', (err, user) => {
                if (user) req.id = user.id;
            });
            next();
        });
    }

    routes() {
        this.server.use(router);
    }
}

module.exports = new App().server;
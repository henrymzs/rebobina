const express = require('express');
const router = require('./src/routes/routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
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
        this.server.use(cors({
            origin: '*',
            credentials: true,
        }));
    }
    routes() {
        this.server.use(router);
    }
}

module.exports = new App().server;
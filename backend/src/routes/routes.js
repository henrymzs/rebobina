const { Router } = require('express');
const router = new Router();
const ListaFilmesDAO = require('../models/DAO/ListaFilmesDAO');
const ListasAcessadasDAO = require('../models/DAO/ListasAcessadasDAO');
const FilmeController = require('../controllers/FilmeController');
const FilmeDAO = require('../models/DAO/FilmeDAO');
const AuthController = require('../controllers/AuthController');
const AuthMiddleware = require('../middleware/AuthMiddleware')
const UserController = require('../controllers/UserController');
const AdminController = require('../controllers/AdminController');

/* === ROUTES/AUTH === */
router.post('/user/register', AuthController.register);
router.post('/user/login', AuthController.login);
router.get('/user/logout', AuthMiddleware, AuthController.logout);

/* === ROUTES/USER === */
router.get('/user/profile', AuthMiddleware, UserController.profile);
router.delete('/user', AuthMiddleware, UserController.deleteUserAccount)

/* === ROUTES/LISTS === */
router.get('/user/share-list', AuthMiddleware, UserController.userShareList)
router.get('/user/list', AuthMiddleware, UserController.userList);
router.put('/user/name-list', AuthMiddleware, UserController.nameList);

/* === ROUTES/FILMS === */
router.post('/movies', AuthMiddleware, FilmeController.addMovie);
router.put('/movies/:id',AuthMiddleware, FilmeController.editMovie);
router.delete('/movies/:id',AuthMiddleware, FilmeController.deleteMovie);

/* === ROUTES/ADMIN === //*/
router.get('/admin/users', AuthMiddleware, AdminController.getAllUsers)
router.put('/admin/user/:id/role', AuthMiddleware, AdminController.updateRole)
router.delete('/admin/user/:id', AuthMiddleware, AdminController.deleteUserAsAdmin);

module.exports = router;
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


router.delete('/minha-lista', async (req, res) => {
  const usuarioLogado = await getUsuarioLogado(req);
  if (!usuarioLogado) {
    return res.status(403).json({ error: 'Usuário não autenticado. ' })
  }
  try {
    await ListasAcessadasDAO.excluirAcessosPorLista(usuarioLogado.id);
    const resultado = await ListaFilmesDAO.deleteLista(usuarioLogado.id);
    if (!resultado.sucesso) {
      return res.status(404).json({ error: resultado.mensagem });
    }
    res.status(200).json({ message: 'Lista excluída com sucesso!' });
  } catch (error) {
    console.error('Erro na rota de exclusão da lista:', error);
    res.status(500).json({ error: 'Erro ao exclusão lista.' });
  }
})

module.exports = router;
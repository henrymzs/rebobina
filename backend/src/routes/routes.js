const { Router } = require('express');
const router = new Router();
const ListaFilmesDAO = require('../models/DAO/ListaFilmesDAO');
const ListasAcessadasDAO = require('../models/DAO/ListasAcessadasDAO');
const FilmeController = require('../controllers/FilmeController');
const FilmeDAO = require('../models/DAO/FilmeDAO');
const AuthController = require('../controllers/AuthController');
const AuthMiddleware = require('../middleware/AuthMiddleware')
const UserController = require('../controllers/UserController');

/* === ROUTES/AUTH === */
router.post('/user/register', AuthController.register);
router.post('/user/login', AuthController.login);
router.get('/user/logout', AuthMiddleware, AuthController.logout);

/* === ROUTES/USER === */
router.get('/user/profile', AuthMiddleware, UserController.profile);

/* === ROUTES/LISTS === */
router.get('/user/list', AuthMiddleware, UserController.userList);
router.put('/user/name-list', AuthMiddleware, UserController.nameList);

/* === ROUTES/FILMS === //*/
router.post('/filmes', AuthMiddleware, FilmeController.addMovie);
router.put('/filmes/:id',AuthMiddleware, FilmeController.editMovie);
router.delete('/filmes/:id',AuthMiddleware, FilmeController.deleteMovie);

/* === ROUTES/ADMIN === //*/
router.get('/admin/users', AuthMiddleware, UserController.getAllUsers)
router.delete('/admin/users/:id', AuthMiddleware, UserController.deleteUser);
router.put('/admin/users/:id/role', UserController.updateRole)

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

router.get('/minha-lista/compartilhar', async (req, res) => {
  const usuarioLogado = await getUsuarioLogado(req);
  if (!usuarioLogado) {
    return res.status(403).json({ error: 'Usuário não autenticado.' });
  }

  try {
    const resultado = await ListaFilmesDAO.findByUserId(usuarioLogado.id);
    if (!resultado.sucesso) {
      return res.status(404).json({ error: resultado.mensagem });
    }

    const linkCompartilhamento = `https://meusistema.com/lista-filmes/${resultado.lista.tokenCompartilhamento}`;

    res.status(200).json({ link: linkCompartilhamento });

  } catch (error) {
    console.error('Erro ao gerar link de compartilhamento:', error);
    res.status(500).json({ error: 'Erro ao gerar link de compartilhamento.' });
  }
});

router.get('/lista-filmes/:token', async (req, res) => {
  const { token } = req.params;
  const usuarioLogado = await getUsuarioLogado(req);
  try {
    const resultado = await ListaFilmesDAO.findByToken(token);
    if (!resultado.sucesso) {
      return res.status(404).json({ error: resultado.mensagem });
    }
    if (usuarioLogado) {
      await ListasAcessadasDAO.registrarAcesso(usuarioLogado.id, resultado.lista.id);
    }
    res.status(200).json({ lista: resultado.lista });
  } catch (error) {
    console.error('Erro ao buscar lista filmes:', error);
    res.status(500).json({ error: 'Erro ao buscar lista .' });
  }
});

 router.get('/info-lista/:token', AuthMiddleware, async (req, res) => {
   const { token } = req.params;
  const usuarioLogado = await getUsuarioLogado(req);

   try {
    const resultado = await ListaFilmesDAO.findByToken(token);
     if (!resultado.sucesso) {
      return res.status(404).json({ error: resultado.mensagem });
     }
     const acessos = await ListasAcessadasDAO.buscarAcessosPorLista(resultado.lista.id);
     const filmes = await FilmeDAO.findAllByLista(resultado.lista.id);
     res.status(200).json({
       nomeLista: resultado.lista.nomeLista,
       dono: resultado.lista.usuarioId,
      tokenCompartilhamento: resultado.lista.tokenCompartilhamento,
       usuariosQueAcessaram: acessos || [],
       usuarioAtual: usuarioLogado ? { id: usuarioLogado.id, nome: usuarioLogado.nome } : null,
       filmes: filmes || []
     });

   } catch (error) {
     console.error('Erro ao obter informações da lista:', error);
     res.status(500).json({ error: 'Erro ao obter informações da lista.' });
   }
 });
 
module.exports = router;
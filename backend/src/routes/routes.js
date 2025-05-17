const { Router } = require('express');
const router = new Router();
const LoginController = require('../controllers/LoginController');
const RegisterController = require('../controllers/RegisterController')
const UsuarioDAO = require('../models/DAO/UsuarioDAO');

async function getUsuarioLogado(req) {
  return await UsuarioDAO.getById(req.id);
}

router.post('/register', RegisterController.register);
router.post('/login', LoginController.login);

router.get('/profile', async (req, res) => {
  try {
    const usuarioLogado = await getUsuarioLogado(req);
    if (!usuarioLogado) {
      return res.status(404).send('Usuário não encontrado')
    }
    res.status(200).json(usuarioLogado);
  } catch (error) {
    console.error('Erro ao buscar perfil: ', error);
    res.status(500).send('Erro interno ao buscar perfil');
  }
});

router.get('/register', async (req, res) => {
  const usuarioLogado = await getUsuarioLogado(req);
  if (!usuarioLogado) {
    res.status(200).json({
      message: 'Usuário não registrado, redirecionando para á página de cadastro.',
      acesso: true,
      redirect: '/register'
    });
  }
  return res.status(403).json({
    message: 'Usuário já tem cadastro, redirecionando para a página de login.',
    acesso: false,
    redirect: '/login'
  });
});

router.get('/login', async (req, res) => {
  const usuarioLogado = await getUsuarioLogado(req);
  if (!usuarioLogado) {
    res.status(200).json({
      message: 'Usuário ainda não fez login, redirecionando para á página de login.',
      acesso: true,
      redirect: '/login'
    });
  }
  return res.status(403).json({
    message: 'Usuário já esta logado, redirecionando para á página principal. ',
    acesso: false,
    redirect: '/'
  }); 
});

router.get('/deslogar', async (req, res) => {
  const usuarioLogado = await getUsuarioLogado(req);
  if (!usuarioLogado) {
    return res.status(401).json({ error: 'Nenhum usuário logado.' });
  }
  res.clearCookie('tokenJWT');
  res.status(200).json({
    message: 'Usuário deslogado com sucesso!',
    email: usuarioLogado.email
  });
});

router.get('/usuarios', async (req, res) => {
  const usuarioLogado = await getUsuarioLogado(req); 
  if (!usuarioLogado || usuarioLogado.role !== 'admin') {
    return res.redirect('/');
  }
  const listaUsuarios = await UsuarioDAO.getAll();
  res.status(200).json(listaUsuarios);
});

router.delete('/usuarios/:id', async (req, res) => {
    const usuarioLogado = await getUsuarioLogado(req);
    if (!usuarioLogado || usuarioLogado.role !== 'admin') {
        return res.status(403).json({ error: 'Apenas administradores podem excluir usuários.' });
    }
    const usuarioId = req.params.id;
    const result = await UsuarioDAO.delete(usuarioId)
    if (result.success) {
      return res.status(200).json({ message: result.message });
    }
    return res.status(404).json({ message: result.message });
});

module.exports = router;
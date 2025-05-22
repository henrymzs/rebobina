const { Router } = require('express');
const router = new Router();
const LoginController = require('../controllers/LoginController');
const RegisterController = require('../controllers/RegisterController')
const UsuarioDAO = require('../models/DAO/UsuarioDAO');
const ListaFilmesDAO = require('../models/DAO/ListaFilmesDAO');
const ListaFilmes = require('../models/ListaFilmes');

async function getUsuarioLogado(req) {
  return await UsuarioDAO.getById(req.id);
}

router.post('/register', RegisterController.register);
router.post('/login', LoginController.login);

router.get('/profile', async (req, res) => {
  const usuarioLogado = await getUsuarioLogado(req);
  if (!usuarioLogado) {
    return res.status(403).json({ error: 'Usuário não autenticado.' });
  }
  try {
    const resultado = await ListaFilmesDAO.findByUserId(usuarioLogado.id);
    const perfilUsuario = {
      id: usuarioLogado.id,
      nome: usuarioLogado.nome,
      email: usuarioLogado.email,
      ListaFilmes: resultado.sucesso ? resultado.lista : null
    };
    res.status(200).json(perfilUsuario);
  } catch (error) {
    console.error('Erro ao buscar perfil do usuário.');
    res.status(500).json({ error: 'Erro ao buscar o perfil do usuário.' })
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

router.put('/usuarios/update/:id', async (req, res) => {
  const usuarioLogado = await getUsuarioLogado(req);
  if (usuarioLogado.role === 'admin') {
    const usuarioId = req.params.id;
    const novoRole = req.body.role;

    if (novoRole !== 'admin' && novoRole !== 'user') {
      return res.status(400).json({ error: 'Role inválido. Deve ser "admin" ou "user".' });
    }

    try {
      const result = await UsuarioDAO.updateRole(usuarioId, novoRole);
      if (result.success) {
        res.status(200).json({ message: result.message });
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      console.error('Erro ao atualizar role do usuário:', error);
      res.status(500).json({ error: 'Erro ao atualizar role do usuário' });
    }
  } else {
    res.status(403).json({ error: 'Usuário não autorizado' });
  }
});

router.post('/criar-lista', async (req, res) => {
  const usuarioLogado = await getUsuarioLogado(req);
  if (!usuarioLogado) {
    return res.status(403).json({ error: 'Usuário não autenticado' });
  }

  const { nomeLista } = req.body;

  try {
    const novaLista = await ListaFilmesDAO.create({ usuarioId: usuarioLogado.id, nomeLista });
    if (novaLista) {
      res.status(201).json({ message: 'Lista criada com sucesso!', lista: novaLista });
    } else {
      res.status(500).json({ error: 'Erro ao criar lista.' });
    }
  } catch (error) {
    console.error('Erro na rota de criação da lista', error);
    res.status(500).json({ error: 'Erro ao criar lista de filmes' });
  }
});

router.get('/minha-lista', async (req, res) => {
  const usuarioLogado = await getUsuarioLogado(req);
  if (!usuarioLogado) {
    return res.status(403).json({ error: 'Usuário não autenticado.' });
  }

  const resultado = await ListaFilmesDAO.findByUserId(usuarioLogado.id);
  if (!resultado.sucesso) {
    return res.status(404).json({ error: resultado.mensagem });
  }
  res.status(200).json({ lista: resultado.lista });
});

router.put('/nome-lista', async (req, res) => {
    const usuarioLogado = await getUsuarioLogado(req);
    if (!usuarioLogado) {
      return res.status(403).json({ error: 'Usuário não autenticado.' });
    }
    const { nomeLista } = req.body;
    try {
        const resultado = await ListaFilmesDAO.updateLista(usuarioLogado.id, nomeLista);
        if (!resultado.sucesso) {
            return res.status(404).json({ error: resultado.mensagem });
        }
        res.status(200).json({ message: 'Nome da lista atualizado com sucesso!', lista: resultado.lista });
    } catch (error) {
        console.error('Erro na rota de atualização da lista:', error);
        res.status(500).json({ error: 'Erro ao atualizar lista.' });
    }
});

router.delete('/minha-lista', async (req, res) => {
  const usuarioLogado = await getUsuarioLogado(req);
  if (!usuarioLogado) {
    return res.status(403).json({ error: 'Usuário não autenticado. ' })
  }
  try {
    const resultado = await ListaFilmesDAO.deleteLista(usuarioLogado.id);
    if (!resultado.sucesso) {
      return res.status(404).json({ error: resultado.mensagem });
    }
    res.status(200).json({ message: 'Lista excluída com sucesso!'});
  } catch (error) {
    console.error("Erro na rota de exclusão da lista:", error);
    res.status(500).json({ error: "Erro ao exclusão lista." });
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
        console.error("Erro ao gerar link de compartilhamento:", error);
        res.status(500).json({ error: "Erro ao gerar link de compartilhamento." });
    }
});

module.exports = router;
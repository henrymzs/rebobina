const UserService = require('../services/UserService');

const profile = async (req, res) => {
    const usuario = req.usuario;
    try {
        return res.status(200).json({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
        });
    } catch (error) {
        console.error("Erro ao buscar perfil do usuário", error);
        return res.status(500).json({ error: 'Erro ao buscar perfil do usuário.' });
    };
};

const userList = async (req, res) => {
    const usuarioId = req.usuario.id;
    try {
        const resultado = await UserService.searchUserList(usuarioId);
        if (!resultado.sucesso) {
           return res.status(404).json({ error: resultado.mensagem });
        }
        return res.status(200).json({ 
            ListaFilmes: resultado.lista,
            acessadoPor: resultado.acessadoPor });
    } catch (error) {
        console.error("Erro ao buscar lista do usuário", error);
        return res.status(500).json({ error: 'Erro ao buscar lista do usuário.' });
    }
}

const nameList = async (req, res) => {
    const usuario = req.usuario;
    const { nomeLista } = req.body;
    try {
        const resultado = await UserService.updateNameList(usuario.id, nomeLista)
        if (!resultado.sucesso) {
            return res.status(404).json({ error: resultado.mensagem })
        }
        res.status(200).json({ message: "Nome da lista atualizada com sucesso!", lista: resultado.lista });
    } catch (error) {
        console.error('Erro na rota de atualização da lista:', error);
        res.status(500).json({ error: 'Erro ao atualizar lista.' });
    }
}

const deleteUserAccount = async (req, res) => {
  const { id } = req.usuario;
  try {
    const resultado = await UserService.deleteUserAccount(id);
    if (!resultado.success) {
      return res.status(404).json({ message: resultado.message });
    }
    return res.status(200).json({ message: 'Conta excluída com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir conta do usuário:', error);
    return res.status(500).json({ error: 'Erro interno ao excluir conta.' });
  }
};

module.exports = { profile, userList, nameList, deleteUserAccount };
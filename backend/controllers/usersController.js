const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/usersModel');

// Listar todos os usuários
router.get('/users', async (req, res) => {
  try {
    const users = await Users.listarUsuarios();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
});

// Adicionar um novo usuário
router.post('/users', async (req, res) => {
  const { nome, email, senha, cpf, endereco } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    await Users.adicionarUsuario({ nome, email, senha: hashedPassword, cpf, endereco, tipo: 'cliente' });
    res.status(201).json({ message: 'Usuário adicionado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao adicionar usuário.' });
  }
});

// Autenticação de usuário (login)
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await Users.buscarUsuarioPorEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ id: user.id }, 'secreta_chave_do_token', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao autenticar usuário.' });
  }
});

module.exports = router;

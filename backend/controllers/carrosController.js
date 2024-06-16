const express = require('express');
const router = express.Router();
const Carros = require('../models/carrosModel');

// Listar todos os carros
router.get('/carros', async (req, res) => {
  try {
    const carros = await Carros.listarCarros();
    res.json(carros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar carros.' });
  }
});

// Adicionar um novo carro
router.post('/carros', async (req, res) => {
  const novoCarro = req.body;
  try {
    await Carros.adicionarCarro(novoCarro);
    res.status(201).json({ message: 'Carro adicionado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao adicionar carro.' });
  }
});

// Editar um carro existente
router.put('/carros/:id', async (req, res) => {
  const { id } = req.params;
  const novoCarro = req.body;
  try {
    await Carros.editarCarro(id, novoCarro);
    res.json({ message: 'Carro editado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao editar carro.' });
  }
});

// Excluir um carro
router.delete('/carros/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Carros.excluirCarro(id);
    res.json({ message: 'Carro excluído com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir carro.' });
  }
});

module.exports = router;

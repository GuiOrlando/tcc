const express = require('express');
const cors = require('cors');
const carrosController = require('./controllers/carrosController');
const userController = require('./controllers/usersController');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

// Middleware para análise de JSON
app.use(express.json());

// Middleware para lidar com CORS
app.use(cors({
  origin: 'http://localhost:3000', // Permitir solicitações apenas do frontend em localhost:3000
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permitir os métodos necessários
  allowedHeaders: ['Content-Type', 'Authorization'], // Permitir os cabeçalhos necessários
}));

// Rotas
app.use('/api', carrosController);
app.use('/api', userController);
app.use('/api/users', authMiddleware);

// Porta do servidor
const PORT = process.env.PORT || 5000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

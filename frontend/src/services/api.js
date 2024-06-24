const API_URL = 'http://localhost:5000/api';

// Função para salvar o token no localStorage
const saveToken = (token) => {
  localStorage.setItem('token', token);
};

// Função para obter o token do localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Função para remover o token do localStorage
export const removeToken = () => {
  localStorage.removeItem('token');
};

// Função para fazer login
export const login = async (email, senha) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, senha }),
  });

  const data = await response.json();

  if (response.ok) {
    saveToken(data.token);
  } else {
    throw new Error(data.message);
  }
};

// Função para fazer logout
export const logout = () => {
  removeToken();
};

// Função para verificar se o usuário está autenticado
export const isAuthenticated = () => {
  return !!getToken();
};

// Função para obter cabeçalhos autorizados
const getAuthHeaders = () => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
};

// Operações relacionadas aos carros
export const getAllCarros = async () => {
  const response = await fetch(`${API_URL}/carros`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  return data;
};

export const addCarro = async (carro) => {
  await fetch(`${API_URL}/carros`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(carro),
  });
};

export const editCarro = async (id, carro) => {
  await fetch(`${API_URL}/carros/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(carro),
  });
};

export const deleteCarro = async (id) => {
  await fetch(`${API_URL}/carros/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
};

// Operações relacionadas aos usuários
export const signup = async (usuario) => {
  await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  });
};

export const getAllUsers = async () => {
  const response = await fetch(`${API_URL}/users`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  return data;
};
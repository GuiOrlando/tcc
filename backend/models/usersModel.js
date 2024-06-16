const connection = require('../db');
const bcrypt = require('bcryptjs');

function listarUsuarios() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function adicionarUsuario(usuario) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(usuario.senha, 10, (hashError, hashedPassword) => {
      if (hashError) {
        reject(hashError);
      } else {
        usuario.senha = hashedPassword; // Sobrescreve a senha não criptografada com o hash criptografado
        connection.query('INSERT INTO users SET ?', usuario, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      }
    });
  });
}

function buscarUsuarioPorEmail(email) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
}

module.exports = {
  listarUsuarios,
  adicionarUsuario,
  buscarUsuarioPorEmail,
};

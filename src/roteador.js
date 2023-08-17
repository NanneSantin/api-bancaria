const express = require('express');
const { listarContas, criarConta, atualizarConta, deletarConta } = require('./controladores/contas');
const { validarInsercaoDeDados, valirdarCpfEEmail, validarNumeroConta } = require('./intermediarios');

const rotas = express();

rotas.get('/contas', listarContas);
rotas.post('/contas', validarInsercaoDeDados, valirdarCpfEEmail, criarConta);
rotas.put('/contas/:numeroConta/usuario', validarNumeroConta, validarInsercaoDeDados, valirdarCpfEEmail, atualizarConta);
rotas.delete('/contas/:numeroConta', validarNumeroConta, deletarConta);

module.exports = rotas;

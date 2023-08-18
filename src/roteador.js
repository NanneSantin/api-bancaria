const express = require('express');
const { listarContas, criarConta, atualizarConta, deletarConta, verificarSaldo } = require('./controladores/contas');
const { validarInsercaoDeDados, valirdarCpfEEmail, validarNumeroConta } = require('./intermediarios');
const { realizarDepositos, realizarSaque, realizarTransferencias } = require('./controladores/transacoes');

const rotas = express();

rotas.get('/contas', listarContas);
rotas.post('/contas', validarInsercaoDeDados, valirdarCpfEEmail, criarConta);
rotas.put('/contas/:numeroConta/usuario', validarNumeroConta, validarInsercaoDeDados, atualizarConta);
rotas.delete('/contas/:numeroConta', validarNumeroConta, deletarConta);
rotas.post('/transacoes/depositar', realizarDepositos);
rotas.post('/transacoes/sacar', realizarSaque);
rotas.post('/transacoes/transferir', realizarTransferencias);
rotas.get('/contas/saldo', verificarSaldo);

module.exports = rotas;

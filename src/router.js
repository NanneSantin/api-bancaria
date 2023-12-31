const express = require('express');
const { listAccounts, createAccount, updateData, removeAccount } = require('./controllers/account_controller');
const { validateDataInBody, validateIdAccount, validateValue } = require('./middlewares');
const { makeDeposit, withdraw, makeTransfers } = require('./controllers/transaction_controller')
const { viewStatement, checkBalance } = require('./controllers/account_operations_controller')


const routes = express();

routes.get('/contas', listAccounts);
routes.post('/contas', validateDataInBody, createAccount);
routes.put('/contas/:numeroConta/usuario', validateIdAccount, validateDataInBody, updateData);
routes.delete('/contas/:numeroConta', validateIdAccount, removeAccount);
routes.get('/contas/saldo', checkBalance);
routes.get('/contas/extrato', viewStatement);

routes.use(validateIdAccount);
routes.use(validateValue);
routes.post('/transacoes/depositar', makeDeposit);
routes.post('/transacoes/sacar', withdraw);
routes.post('/transacoes/transferir', makeTransfers);

module.exports = routes;

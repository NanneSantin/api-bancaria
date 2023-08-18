const { depositos, saques, transferencias } = require('../data/database');
const { findAccount } = require('./helper_functions');
const dateFns = require('date-fns');

const makeDeposit = async (request, response) => {
    const { numero_conta, valor } = request.body;

    if (!(numero_conta && valor)) {
        return response.status(400).json({ mensagem: "O número da conta e o valor são obrigatórios!" });
    }

    if (!findAccount(numero_conta)) {
        return response.status(404).json({ mensagem: "Conta bancária não localizada!" });
    }

    if (valor <= 0) {
        return response.status(400).json({ mensagem: "Valor inválido." });
    }

    const accountFound = findAccount(numero_conta);

    accountFound.saldo += valor;

    const newDeposit = {
        data: dateFns.format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numero_conta,
        valor
    }

    depositos.push(newDeposit);

    return response.status(201).send();
}

const withdraw = async (request, response) => {
    const { numero_conta, valor, senha } = request.body;

    if (!(numero_conta && valor && senha)) {
        return response.status(400).json({ mensagem: "O número da conta, o valor e a senha são obrigatórios!" });
    }

    if (!findAccount(numero_conta)) {
        return response.status(404).json({ mensagem: "Conta bancária não localizada!" });
    }

    if (valor <= 0) {
        return response.status(400).json({ mensagem: "Valor inválido." });
    }

    const accountFound = findAccount(numero_conta);

    if (accountFound.usuario.senha !== senha) {
        return response.status(401).json({ mensagem: "Senha inválida." });
    }

    if (accountFound.saldo < valor) {
        return response.status(403).json({ mensagem: "Saldo insuficiente." });
    }

    accountFound.saldo -= valor;

    const newWithdwrawal = {
        data: dateFns.format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numero_conta,
        valor
    }

    saques.push(newWithdwrawal);
    return response.status(201).send();
}

const makeTransfers = async (request, response) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = request.body;

    if (!(numero_conta_origem && numero_conta_destino && valor && senha)) {
        return response.status(400).json({ mensagem: "O número da conta de origem, o número da conta de destino, o valor e a senha são obrigatórios!" });
    }

    const sourceAccount = findAccount(numero_conta_origem);
    const destinationAccount = findAccount(numero_conta_destino);

    if (!sourceAccount) {
        return response.status(404).json({ mensagem: "Conta de origem não encontrada." });
    }
    if (!destinationAccount) {
        return response.status(404).json({ mensagem: "Conta de destino não encontrada." });
    }

    if (sourceAccount.usuario.senha !== senha) {
        return response.status(401).json({ mensagem: "Senha inválida." });
    }

    if (valor <= 0) {
        return response.status(400).json({ mensagem: "Valor inválido." });
    }

    if (sourceAccount.saldo < valor) {
        return response.status(403).json({ mensagem: "Saldo insuficiente." });
    }

    sourceAccount.saldo -= valor;
    destinationAccount.saldo += valor;

    const newTransfer = {
        data: dateFns.format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }

    transferencias.push(newTransfer);

    return response.status(201).send();
}

module.exports = {
    makeDeposit,
    withdraw,
    makeTransfers
}
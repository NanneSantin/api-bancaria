const { depositos, saques, transferencias } = require('../data/database');
const { findAccount } = require('./helper_functions');

const checkBalance = async (request, response) => {
    const { numero_conta, senha } = request.query;

    if (!(numero_conta && senha)) {
        return response.status(400).json({ mensagem: "O número da conta e a senha são obrigatórios!" });
    }

    if (!findAccount(numero_conta)) {
        return response.status(404).json({ mensagem: "Conta bancária não localizada!" });
    }

    const accountFound = findAccount(numero_conta);

    if (accountFound.usuario.senha !== senha) {
        return response.status(401).json({ mensagem: "Senha inválida." });
    }

    return response.status(200).json({ saldo: accountFound.saldo });
}

const viewStatement = async (request, response) => {
    const { numero_conta, senha } = request.query;

    if (!(numero_conta && senha)) {
        return response.status(400).json({ mensagem: "O número da conta e a senha são obrigatórios!" });
    }

    if (!findAccount(numero_conta)) {
        return response.status(404).json({ mensagem: "Conta bancária não localizada!" });
    }

    const accountFound = findAccount(numero_conta);

    if (accountFound.usuario.senha !== senha) {
        return response.status(401).json({ mensagem: "Senha inválida." });
    }

    const historicoDepositos = depositos.filter((deposito) => deposito.numero_conta === numero_conta);
    const historicoSaques = saques.filter((saque) => saque.numero_conta === numero_conta);
    const historicoTransferencias = transferencias.filter((transferencia) => transferencia.numero_conta_origem === numero_conta);

    return response.status(200).json({
        depositos: historicoDepositos,
        saques: historicoSaques,
        transferencias: historicoTransferencias
    });
}

module.exports = {
    checkBalance,
    viewStatement
}

const { contas, depositos, saques, transferencias } = require('../dados/bancodedados');
const dateFns = require('date-fns');

const realizarDepositos = async (request, response) => {
    const { numero_conta, valor } = request.body;

    const contaEncontrada = contas.find((conta) => conta.numero === Number(numero_conta));

    if (!numero_conta || !valor) {
        return response.status(400).json({ mensagem: "O número da conta e o valor são obrigatórios!" });
    }
    if (!contaEncontrada) {
        return response.status(400).json({ mensagem: "Conta não encontrada." });
    }
    if (valor <= 0) {
        return response.status(400).json({ mensagem: "Valor inválido." });
    }

    contaEncontrada.saldo += valor;

    const novoDeposito = {
        data: dateFns.format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numero_conta,
        valor
    }

    depositos.push(novoDeposito);

    return response.status(201).send();
};

const realizarSaque = async (request, response) => {
    const { numero_conta, valor, senha } = request.body;

    if (!(numero_conta && valor && senha)) {
        return response.status(400).json({ mensagem: "O número da conta, o valor e a senha são obrigatórios!" });
    }

    const contaEncontrada = contas.find((conta) => conta.numero === Number(numero_conta));

    if (!contaEncontrada) {
        return response.status(400).json({ mensagem: "Conta não encontrada." });
    }

    if (contaEncontrada.usuario.senha !== senha) {
        return response.status(400).json({ mensagem: "Senha inválida." });
    }

    if (valor <= 0) {
        return response.status(400).json({ mensagem: "Valor inválido." });
    }

    if (contaEncontrada.saldo < valor) {
        return response.status(400).json({ mensagem: "Saldo insuficiente." });
    }

    contaEncontrada.saldo -= valor;

    const novoSaque = {
        data: dateFns.format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numero_conta,
        valor
    }

    saques.push(novoSaque);
    return response.status(201).send();
};

const realizarTransferencias = async (request, response) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = request.body;

    if (!(numero_conta_origem && numero_conta_destino && valor && senha)) {
        return response.status(400).json({ mensagem: "O número da conta de origem, o número da conta de destino, o valor e a senha são obrigatórios!" });
    }

    const contaDeOrigem = contas.find((conta) => conta.numero === Number(numero_conta_origem));
    const contaDeDestino = contas.find((conta) => conta.numero === Number(numero_conta_destino));

    if (!contaDeOrigem) {
        return response.status(400).json({ mensagem: "Conta de origem não encontrada." });
    }
    if (!contaDeDestino) {
        return response.status(400).json({ mensagem: "Conta de destino não encontrada." });
    }

    if (contaDeOrigem.usuario.senha !== senha) {
        return response.status(400).json({ mensagem: "Senha inválida." });
    }

    if (valor <= 0) {
        return response.status(400).json({ mensagem: "Valor inválido." });
    }

    if (contaDeOrigem.saldo < valor) {
        return response.status(400).json({ mensagem: "Saldo insuficiente." });
    }

    contaDeOrigem.saldo -= valor;
    contaDeDestino.saldo += valor;

    const novaTransferencia = {
        data: dateFns.format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }

    transferencias.push(novaTransferencia);

    return response.status(201).send();
};

module.exports = {
    realizarDepositos,
    realizarSaque,
    realizarTransferencias
}
const { banco, contas } = require('../data/database');
const { findAccount, findCpf, findEmail } = require('./helper_functions');

let numero = 1;

const listAccounts = async (request, response) => {
    const { senha_banco } = request.query;

    if (!senha_banco) {
        return response.status(401).json({ mensagem: "Usuário não está autenticado. Informe a senha." });
    }
    if (senha_banco !== banco.senha) {
        return response.status(401).json({ mensagem: "Senha inválida!" });
    }

    return response.status(200).json(contas);
}

const createAccount = async (request, response) => {
    const newAccount = request.body;

    const cpfFound = findCpf(newAccount.cpf);
    const emailFound = findEmail(newAccount.email);

    if (cpfFound !== undefined || emailFound !== undefined) {
        return response.status(409).json({ mensagem: "Já existe uma conta com o cpf ou e-mail informado!" });
    }

    const newAccountWithId = { numero, saldo: 0, usuario: { ...newAccount } };
    numero++;

    contas.push(newAccountWithId);
    return response.status(201).send();
}

const updateData = async (request, response) => {
    const newData = request.body;
    const { numeroConta } = request.params;

    const accountFound = findAccount(numeroConta);

    if (newData.cpf !== accountFound.usuario.cpf) {
        const cpfFound = findCpf(newData.cpf);

        if (cpfFound !== undefined) {
            return response.status(409).json({ mensagem: "Já existe uma conta com o cpf informado!" });
        }
    }

    if (newData.email !== accountFound.usuario.email) {
        const emailFound = findEmail(newData.email);

        if (emailFound !== undefined) {
            return response.status(409).json({ mensagem: "Já existe uma conta com o e-mail informado!" });
        }
    }

    accountFound.usuario = { ...newData };

    return response.status(201).send();
}

const removeAccount = async (request, response) => {
    const { numeroConta } = request.params;

    const index = contas.findIndex((conta) => conta.numero === Number(numeroConta));

    if (contas[index].saldo > 0) {
        return response.status(403).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
    }

    contas.splice(index, 1);

    return response.status(201).send();
}

module.exports = {
    listAccounts,
    createAccount,
    updateData,
    removeAccount
};

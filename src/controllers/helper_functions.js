const { contas } = require('../data/database');

function findAccount(idAccount) {
    const accountFound = contas.find((conta) => conta.numero === Number(idAccount));
    return accountFound;
}

function findCpf(cpf) {
    const cpfFound = contas.find((conta) => conta.usuario.cpf === cpf);
    return cpfFound;
}

function findEmail(email) {
    const emailFound = contas.find((conta) => conta.usuario.email === email);
    return emailFound;
}

module.exports = {
    findAccount,
    findCpf,
    findEmail
}

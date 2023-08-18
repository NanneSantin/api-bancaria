const { contas } = require('./data/database');

const validateDataInBody = async (request, response, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = request.body;

    if (!nome || nome.trim() === '') {
        return response.status(400).json({ mensagem: 'É obrigatório informar um nome.' });
    }
    if (!cpf || cpf.trim() === '') {
        return response.status(400).json({ mensagem: 'É obrigatório informar um cpf.' });
    }
    if (!data_nascimento || data_nascimento.trim() === '') {
        return response.status(400).json({ mensagem: 'É obrigatório informar a data de nascimeno.' });
    }
    if (!telefone || telefone.trim() === '') {
        return response.status(400).json({ mensagem: 'É obrigatório informar um telefone.' });
    }
    if (!email || email.trim() === '') {
        return response.status(400).json({ mensagem: 'É obrigatório informar um email.' });
    }
    if (!senha || senha.trim() === '') {
        return response.status(400).json({ mensagem: 'É obrigatório informar uma senha.' });
    }

    next();
};


const validateIdAccount = async (request, response, next) => {
    const { numeroConta } = request.params;

    const accountFound = contas.find((conta) => conta.numero === Number(numeroConta));

    if (!accountFound) {
        return response.status(404).json({ mensagem: "Conta bancária não localizada!" });
    }

    next();
};

module.exports = {
    validateDataInBody,
    validateIdAccount
};

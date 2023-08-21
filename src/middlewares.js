const { findAccount } = require('./controllers/helper_functions');

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
    const { numero_conta, numero_conta_origem, numero_conta_destino } = request.body;

    if (!numeroConta) {
        if (!numero_conta) {
            if (!findAccount(numero_conta_origem)) {
                return response.status(404).json({ mensagem: "Conta de origem não encontrada." });
            }

            if (!findAccount(numero_conta_destino)) {
                return response.status(404).json({ mensagem: "Conta de destino não encontrada." });
            }

            next();
        } else {
            if (!findAccount(numero_conta)) {
                return response.status(404).json({ mensagem: "Conta bancária não localizada!" });
            }

            next();
        }
    } else {

        if (!findAccount(numeroConta)) {
            return response.status(404).json({ mensagem: "Conta bancária não localizada!" });
        }

        next();
    }
};

const validateValue = (request, response, next) => {
    const { valor } = request.body;

    if (valor <= 0) {
        return response.status(400).json({ mensagem: "Valor inválido." });
    }

    next();
};

module.exports = {
    validateDataInBody,
    validateIdAccount,
    validateValue
};

const { banco, contas } = require('./dados/bancodedados');

const validarSenha = async (request, response, next) => {
    const { senha_banco } = request.query;

    if (!senha_banco) {
        return response.status(401).json({ mensagem: "Usuário não está autenticado. Informe a senha." });
    }
    if (senha_banco !== banco.senha) {
        return response.status(401).json({ mensagem: "A senha do banco informada é inválida!" });
    }
    next();
};

const validarInsercaoDeDados = async (request, response, next) => {
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

const valirdarCpfEEmail = async (request, response, next) => {
    const { cpf, email } = request.body;

    const cpfEncontrado = contas.find((conta) => conta.usuario.cpf === cpf);
    const emailEncontrado = contas.find((conta) => conta.usuario.email === email);

    if (cpfEncontrado !== undefined || emailEncontrado !== undefined) {
        return response.status(400).json({ mensagem: "Já existe uma conta com o cpf ou e-mail informado!" });
    }

    next();
};

const validarNumeroConta = async (request, response, next) => {
    const { numeroConta } = request.params;

    const contaEncontrada = contas.find((conta) => conta.numero === Number(numeroConta));

    if (!contaEncontrada) {
        return response.status(400).json({ mensagem: "Conta não encontrada." });
    }

    next();
};

module.exports = {
    validarSenha,
    validarInsercaoDeDados,
    valirdarCpfEEmail,
    validarNumeroConta
};

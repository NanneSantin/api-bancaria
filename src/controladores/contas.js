const { contas } = require('../dados/bancodedados');
let numero = 1;

const listarContas = async (request, response) => {
    return response.status(200).json(contas)
};

const criarConta = async (request, response) => {
    const novaConta = request.body;

    const novaContaComId = { numero, saldo: 0, usuario: { ...novaConta } };
    numero++;

    contas.push(novaContaComId);
    return response.status(201).send();
};

const atualizarConta = async (request, response) => {
    const novosDados = request.body;
    const { numeroConta } = request.params;

    const contaEncontrada = contas.find((conta) => conta.numero === Number(numeroConta));

    if (novosDados.cpf !== contaEncontrada.usuario.cpf) {
        const cpfEncontrado = contas.find((conta) => conta.usuario.cpf === novosDados.cpf);

        if (cpfEncontrado !== undefined) {
            return response.status(400).json({ mensagem: "Já existe uma conta com o cpf informado!" });
        }
    }
    if (novosDados.email !== contaEncontrada.usuario.email) {
        const emailEncontrado = contas.find((conta) => conta.usuario.email === novosDados.email);

        if (emailEncontrado !== undefined) {
            return response.status(400).json({ mensagem: "Já existe uma conta com o e-mail informado!" });
        }
    }

    contaEncontrada.usuario = { ...novosDados };

    return response.status(201).send();
};

const deletarConta = async (request, response) => {
    const { numeroConta } = request.params;

    const indice = contas.findIndex((conta) => conta.numero === Number(numeroConta));

    if (contas[indice].saldo > 0) {
        return response.status(400).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
    }

    contas.splice(indice, 1);

    return response.status(201).send();
};

module.exports = {
    listarContas,
    criarConta,
    atualizarConta,
    deletarConta
};

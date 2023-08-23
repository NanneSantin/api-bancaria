
![Logo](https://i.imgur.com/imJqvK5.png)


# API de Banco Digital da Cubos

Bem-vind@ à API de Banco Digital da CUBOS!  Esta é uma RESTful API que permite a realização de várias operações bancárias, incluindo criação de contas, depósitos, saques, transferências, consulta de saldo e emissão de extratos.

Esta API foi desenvolvida como parte do desafio do Módulo 2 do Curso de Desenvolvimento de Software com foco em back-end da Cubos Academy.


## Índice

- [Funcionalidades](#funcionalidades)
- [Stacks Utilizadas](#stacks-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Rodando Localmente](#rodando-localmente)
- [Documentação da API](#documentação-da-api)
- [Demonstração](#demonstração)
- [Fluxogramas](#fluxogramas)
- [Feedback](#feedback)

## Funcionalidades

- [Listar contas bancárias](#lista-todas-as-contas-bancárias-cadastradas)
- [Criar conta bancária](#criar-uma-conta-bancária)
- [Atualizar os dados do usuário da conta bancária](#atualizar-dados-do-usuário-da-conta-bancária)
- [Excluir uma conta bancária](#remover-uma-conta-bancária)
- [Depositar em uma conta bancária](#depositar-em-uma-conta-bancária)
- [Sacar de uma conta bancária](#sacar-de-uma-conta-bancária)
- [Transferir valores entre contas bancárias](#transferir-valores-entre-contas-bancárias)
- [Consultar saldo da conta bancária](#consultar-saldo-da-conta-bancária)
- [Emitir extrato bancário](#emitir-extrato-bancário)

**Observação:** todos os valores são inseridos e apresentados em centavos.

 _Clique na funcionalidade para ser redirecionado a documentação do endpoint._

<br>

> [<img src='./assets/desfazer.png' alt='Retornar para o início' width='15'> Voltar para o menu](#índice)

## Stacks utilizadas

**Front-end:** Não contemplado

**Back-end:** 
- Node.js
- Express
- Date-fns (para manipulação de datas)

<br>

> [<img src='./assets/desfazer.png' alt='Retornar para o início' width='15'> Voltar para o menu](#índice)

## Pré-requisitos

Node.js instalado (versão 12 ou superior).

## Rodando localmente

### Clone o projeto

```bash
  git clone https://github.com/NanneSantin/api-bancaria-desafio-cubos.git
```

### Abra o diretório no terminal

```bash
  cd api-bancaria-desafio-cubos-main
```

### Instale as dependências

```bash
  npm install
```

### Inicie o servidor

```bash
  npm run dev
```

### Teste a API

A API estará disponível em `http://localhost:3000`. Você pode usar ferramentas como Insomnia ou Postman para testar as diferentes rotas da API.

Caso opte em utilizar Insomnia, importe o arquivo `rotas_insomnia` disponível junto com o projeto.

![demonstracao_insomnia](https://i.imgur.com/owu3zLx.gif)


<br>

> [<img src='./assets/desfazer.png' alt='Retornar para o início' width='15'> Voltar para o menu](#índice)

## Documentação da API

### Lista todas as contas bancárias cadastradas

```http
  GET /contas?senha_banco=Cubos123Bank
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `senha_banco` | `string` | **Obrigatório**. A senha de autenticação do banco. |

**Descrição:**
Este endpoint permite listar todas as contas bancárias cadastradas. Para acessar as informações, é necessário fornecer a senha de autenticação do banco (`senha_banco`) utilizando o parâmetro de consulta na URL (query params).

![fluxo-listar](https://i.imgur.com/gbzR73O.jpg)

<br>

> [<img src='./assets/desfazer.png' alt='Retornar para o início' width='15'> Voltar para o menu](#índice)

### Criar uma conta bancária

```http
  POST /contas
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `nome`      | `string` | **Obrigatório**. Nome do titular da conta |
| `cpf`      | `string` | **Obrigatório**. CPF do titular da conta |
| `data_nascimento`      | `string` | **Obrigatório**. Data de nascimento do titular da conta |
| `telefone`      | `string` | **Obrigatório**. Número de telefone do titular da conta |
| `email`      | `string` | **Obrigatório**. Endereço de email do titular da conta |
| `senha`      | `string` | **Obrigatório**. Senha para acessar a conta |

**Descrição:** 
Este endpoint permite criar uma nova conta bancária. É necessário fornecer os detalhes do titular da conta, incluindo nome, CPF, data de nascimento, telefone, email e senha. O CPF e o email devem ser únicos, ou seja, não podem estar associados a outra conta bancária cadastrada.

![fluxo-criar](https://i.imgur.com/VcaaT8J.jpg)

<br>

> [<img src='./assets/desfazer.png' alt='Retornar para o início' width='15'> Voltar para o menu](#índice)

### Atualizar dados do usuário da conta bancária

```http
  PUT /contas/:numeroConta/usuario
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `numeroConta`      | `string` | **Obrigatório**. Número da conta bancária a ser atualizada. |
| `nome`      | `string` | **Obrigatório**. Novo nome do titular da conta |
| `cpf`      | `string` | **Obrigatório**. Novo CPF do titular da conta |
| `data_nascimento`      | `string` | **Obrigatório**. Nova data de nascimento do titular da conta |
| `telefone`      | `string` | **Obrigatório**. Novo número de telefone do titular da conta |
| `email`      | `string` | **Obrigatório**. Novo endereço de email do titular da conta |
| `senha`      | `string` | **Obrigatório**. Nova senha para acessar a conta |

**Descrição:** 
Este endpoint permite atualizar os dados do usuário associados a uma conta bancária específica. É necessário fornecer o número da conta (`numeroConta`) como parâmetro de requisição na URL (request params) e os novos detalhes do titular da conta, incluindo nome, CPF, data de nascimento, telefone, email e senha no body da requisição. 

O CPF e o email devem ser únicos, ou seja, não podem estar associados a outra conta bancária cadastrada.

Todos os dados precisam ser passados, mesmo aqueles que não serão atualizados. Para estes casos, basta repetir o valor anterior.

![fluxo-atualizar](https://i.imgur.com/WyhCV5T.jpg)

<br>

> [<img src='./assets/desfazer.png' alt='Retornar para o início' width='15'> Voltar para o menu](#índice)

### Remover uma conta bancária

```http
  DELETE /contas/:numeroConta
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `numeroConta`      | `string` | **Obrigatório**. Número da conta bancária a ser excluída. |

**Descrição:** 
Este endpoint permite excluir uma conta bancária. É necessário fornecer o número da conta (`numeroConta`) como parâmetro de requisição na URL (request params).

A conta só pode ser excluída se o saldo for zero.

![fluxo-deletar](https://i.imgur.com/jL72bbB.jpg)

<br>

> [<img src='./assets/desfazer.png' alt='Retornar para o início' width='15'> Voltar para o menu](#índice)

### Depositar em uma conta bancária

```http
  POST /transacoes/depositar
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `numero_conta`      | `string` | **Obrigatório**. Número da conta bancária de destino do depósito. |
| `valor`      | `number` | **Obrigatório**. Valor (em centavos) a ser depositado na conta. |

**Descrição:** 
Este endpoint permite fazer um depósito em uma conta bancária específica. É necessário fornecer o número da conta de destino (`numeroConta`) e o valor do depósito em centavos (`valor`) no body da requisição.

O valor deve ser maior que zero.

![fluxo-depositar](https://i.imgur.com/CLCSoOJ.png)

<br>

> [<img src='./assets/desfazer.png' alt='Retornar para o início' width='15'> Voltar para o menu](#índice)

### Sacar de uma conta bancária

```http
  POST /transacoes/sacar
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `numero_conta`      | `string` | **Obrigatório**. Número da conta bancária de onde será realizado o saque. |
| `valor`      | `number` | **Obrigatório**. Valor (em centavos) a ser sacado da conta. |
| `senha`      | `string` | **Obrigatório**. Senha para autenticar a operação do saque. |

**Descrição:** 
Este endpoint permite realizar um saque de uma conta bancária específica. É necessário fornecer o número da conta de destino (`numeroConta`), o valor do saque em centavos (`valor`) e a senha de autenticação da conta em questão (`senha`) no body da requisição.

O valor deve ser maior que zero.

![fluxo-sacar](https://i.imgur.com/uiAroMg.png)

<br>

> [<img src='./assets/desfazer.png' alt='Retornar para o início' width='15'> Voltar para o menu](#índice)

### Transferir valores entre contas bancárias

```http
  POST /transacoes/sacar
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `numero_conta_origem`      | `string` | **Obrigatório**. Número da conta bancária de origem da transferência. |
| `numero_conta_destino`      | `string` | **Obrigatório**. Número da conta bancária de destino da transferência. |
| `valor`      | `number` | **Obrigatório**. Valor (em centavos) a ser sacado da conta. |
| `senha`      | `string` | **Obrigatório**. Senha para autenticar a operação de transferência. |

**Descrição:** 
Este endpoint permite transferir valores entre duas contas bancárias. É necessário fornecer o número da conta de origem (`numero_conta_origem`), o número da conta de destino (`numero_conta_destino`), o valor da transferência (`valor`) e a senha de autenticação da conta de origem (`senha`) no body da requisição.

O valor deve ser maior que zero.

![fluxo-transferir](https://i.imgur.com/xVuQL4J.jpg)

<br>

> [<img src='./assets/desfazer.png' alt='Retornar para o início' width='15'> Voltar para o menu](#índice)

### Consultar saldo da conta bancária

```http
  GET /contas/saldo
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `numero_conta`      | `string` | **Obrigatório**. Número da conta bancária para consultar o saldo. |
| `senha`      | `string` | **Obrigatório**. Senha para autenticar a consulta de saldo. |

**Descrição:** 
Este endpoint permite consultar o saldo de uma conta bancária específica. É necessário fornecer o número da conta (`numero_conta`) e a senha de autenticação (`senha`) utilizando o parâmetro de consulta na URL (query params).

![fluxo-saldo](https://i.imgur.com/5i7YDBi.jpg)

<br>

> [<img src='./assets/desfazer.png' alt='Retornar para o início' width='15'> Voltar para o menu](#índice)

### Emitir extrato bancário

```http
  GET /contas/extrato
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `numero_conta`      | `string` | **Obrigatório**. Número da conta bancária para emitir o extrato. |
| `senha`      | `string` | **Obrigatório**. Senha para autenticar a emissão do extrato. |

**Descrição:** 
Este endpoint permite emitir um extrato bancário para uma conta bancária específica. É necessário fornecer o número da conta (`numero_conta`) e a senha de autenticação (`senha`) utilizando o parâmetro de consulta na URL (query params).

![fluxo-extrato](https://i.imgur.com/zfqAZio.jpg)

<br>

> [<img src='./assets/desfazer.png' alt='Retornar para o início' width='15'> Voltar para o menu](#índice)

## Demonstração

<img src='./assets/demonstracao.gif'>

## Feedback

Se você tiver algum feedback, por favor me deixe saber por meio de [elaine.s.santin@gmail.com](mailto:seuemail@example.com).

<br>

> [<img src='./assets/desfazer.png' alt='Retornar para o início' width='15'> Voltar para o menu](#índice)

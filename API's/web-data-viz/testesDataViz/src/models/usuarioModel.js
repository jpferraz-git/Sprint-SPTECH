var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        select usua.idusuario, usua.email, usua.senha, empre.idempresa, cozi.idcozinha from usuario as usua
        join empresa as empre on usua.fkempresa = empre.idempresa
        join cozinha as cozi on cozi.fkempresa = empre.idempresa
        where usua.email = '${email}' and usua.senha = '${senha}' limit 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
async function cadastrar(razaoSocial, nomeFantasia, responsavelLegal, cnpj, estado, cidade, numero, bairro, CEP, logradouro, email, telefone, senha){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():" , razaoSocial, nomeFantasia, responsavelLegal, cnpj, cidade, numero, bairro, CEP, telefone, email, senha);
    

    var instrucaoSql = `
    insert into empresa (razaosocial, nomefantasia, responsavellegal, cnpj, uf, cidade, numero, bairro, cep, rua, emailempresa, telefoneempresa) values 
        ('${razaoSocial}', '${nomeFantasia}', '${responsavelLegal}', '${cnpj}', '${estado}', '${cidade}', '${numero}', '${bairro}', '${CEP}',  '${logradouro}', '${email}', '${telefone}');
    `;
    
    await database.executar(instrucaoSql);
}

async function cadastrarUsuario(razaoSocial, nomeFantasia, responsavelLegal, cnpj, estado, cidade, numero, bairro, CEP, logradouro, email, telefone, senha) {
    var instrucaoSql = `
    insert into usuario (nome, email, senha, fkempresa) 
    values ('${nomeFantasia}', '${email}', '${senha}', (select max(idempresa) from empresa));
        `;
    await cadastrar(razaoSocial, nomeFantasia, responsavelLegal, cnpj, estado, cidade, numero, bairro, CEP, logradouro, email, telefone, senha)
    await database.executar(instrucaoSql)
}

async function cadastrarCozinha(razaoSocial, nomeFantasia, responsavelLegal, cnpj, estado, cidade, numero, bairro, CEP, logradouro, email, telefone, senha) {
    var instrucaoSql = `insert into cozinha values (default, 'comercial', '', 3, (select max(idempresa) from empresa));`;
    await cadastrarUsuario(razaoSocial, nomeFantasia, responsavelLegal, cnpj, estado, cidade, numero, bairro, CEP, logradouro, email, telefone, senha)
    await database.executar(instrucaoSql)
}

async function cadastrarLocalSensor(razaoSocial, nomeFantasia, responsavelLegal, cnpj, estado, cidade, numero, bairro, CEP, logradouro, email, telefone, senha) {
    var instrucaoSql = `insert into localsensor (fkcozinha, fkempresa) values ((select max(idcozinha) from cozinha), (select max(idempresa) from empresa)), ((select max(idcozinha) from cozinha), (select max(idempresa) from empresa)), ((select max(idcozinha) from cozinha), (select max(idempresa) from empresa));`
    await cadastrarCozinha(razaoSocial, nomeFantasia, responsavelLegal, cnpj, estado, cidade, numero, bairro, CEP, logradouro, email, telefone, senha)
    await database.executar(instrucaoSql)
}

async function cadastrarSensor(razaoSocial, nomeFantasia, responsavelLegal, cnpj, estado, cidade, numero, bairro, CEP, logradouro, email, telefone, senha) {
    var instrucaoSql = `insert into sensor (sensorstatus, fkcozinha, fkempresa, fklocal) values ('ativo', (select max(idcozinha) from cozinha), (select max(idempresa) from empresa), (select (max(idlocal) - 2) from localsensor)), ('ativo', (select max(idcozinha) from cozinha), (select max(idempresa) from empresa), (select (max(idlocal) - 1) from localsensor)), ('ativo', (select max(idcozinha) from cozinha), (select max(idempresa) from empresa), (select (max(idlocal)) from localsensor));`
    await cadastrarLocalSensor(razaoSocial, nomeFantasia, responsavelLegal, cnpj, estado, cidade, numero, bairro, CEP, logradouro, email, telefone, senha)
    await database.executar(instrucaoSql)
}

async function inserirMedidas(razaoSocial, nomeFantasia, responsavelLegal, cnpj, estado, cidade, numero, bairro, CEP, logradouro, email, telefone, senha) {
    var instrucaoSql = `
    insert into medida(nivel_gas, fksensor) values 
        (0.1, (select (max(idsensor)) from sensor)),
        (0.4, (select (max(idsensor)) from sensor)),
        (0.2, (select (max(idsensor)) from sensor)),
        (0.3, (select (max(idsensor)) from sensor)),
        (0.1, (select (max(idsensor)) from sensor)),
        (0.5, (select (max(idsensor)) from sensor)),
        (0.1, (select (max(idsensor) - 1) from sensor)),
        (0.4, (select (max(idsensor) - 1) from sensor)),
        (0.2, (select (max(idsensor) - 1) from sensor)),
        (0.3, (select (max(idsensor) - 1) from sensor)),
        (0.1, (select (max(idsensor) - 1) from sensor)),
        (0.5, (select (max(idsensor) - 1) from sensor)),
        (0.1, (select (max(idsensor) - 2) from sensor)),
        (0.4, (select (max(idsensor) - 2) from sensor)),
        (0.2, (select (max(idsensor) - 2) from sensor)),
        (0.3, (select (max(idsensor) - 2) from sensor)),
        (0.5, (select (max(idsensor) - 2) from sensor)),
        (0.1, (select (max(idsensor) - 2) from sensor));
        `;
    await cadastrarSensor(razaoSocial, nomeFantasia, responsavelLegal, cnpj, estado, cidade, numero, bairro, CEP, logradouro, email, telefone, senha)
    await database.executar(instrucaoSql)
}

function autenticarEmailModel(email) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function autenticarEmail(): ", email)
    var instrucaoSql = `
        select idusuario, email from usuario where email = '${email}' limit 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarSenhaModel(senha, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarSenhaModel(): ", senha, idUsuario)
    var instrucaoSql = `
        update usuario set senha = '${senha}' where idusuario = ${idUsuario}
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    autenticarEmailModel,
    atualizarSenhaModel,
    inserirMedidas,
    cadastrarSensor,
    cadastrarLocalSensor,
    cadastrarCozinha,
    cadastrarUsuario
};

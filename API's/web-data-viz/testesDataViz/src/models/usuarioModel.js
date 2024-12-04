var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        select usua.idUsuario, usua.email, usua.senha, empre.idEmpresa, cozi.idCozinha from usuario as usua
        join empresa as empre on usua.fkEmpresa = empre.idEmpresa
        join cozinha as cozi on cozi.fkEmpresa = empre.idEmpresa
        where usua.email = '${email}' and usua.senha = '${senha}' LIMIT 1;

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
async function cadastrar(razaoSocial, nomeFantasia, responsavelLegal, cnpj, estado, cidade, numero, bairro, CEP, logradouro, email, telefone, senha){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():" , razaoSocial, nomeFantasia, responsavelLegal, cnpj, cidade, numero, bairro, CEP, telefone, email, senha);
    

    var instrucaoSql = `
    INSERT INTO empresa (razaoSocial, nomeFantasia, responsavelLegal, cnpj, uf, cidade, numero, bairro, CEP, rua, emailEmpresa, telefoneEmpresa) VALUES 
        ('${razaoSocial}', '${nomeFantasia}', '${responsavelLegal}', '${cnpj}', '${estado}', '${cidade}', '${numero}', '${bairro}', '${CEP}',  '${logradouro}', '${email}', '${telefone}');
    `;
    
    await database.executar(instrucaoSql);
}

async function cadastrarUsuario(razaoSocial, nomeFantasia, responsavelLegal, cnpj, estado, cidade, numero, bairro, CEP, logradouro, email, telefone, senha) {
    var instrucaoSql = `
    INSERT INTO usuario (nome, email, senha, fkEmpresa) 
    VALUES ('${nomeFantasia}', '${email}', '${senha}', (SELECT max(idEmpresa) from Empresa));
        `;
    await cadastrar(razaoSocial, nomeFantasia, responsavelLegal, cnpj, estado, cidade, numero, bairro, CEP, logradouro, email, telefone, senha)
    await database.executar(instrucaoSql)
}

async function cadastrarCozinha(razaoSocial, nomeFantasia, responsavelLegal, cnpj, estado, cidade, numero, bairro, CEP, logradouro, email, telefone, senha) {
    var instrucaoSql = `INSERT INTO cozinha VALUES (default, 'Comercial', '', 3, (SELECT max(idEmpresa) from Empresa));`;
    await cadastrarUsuario(razaoSocial, nomeFantasia, responsavelLegal, cnpj, estado, cidade, numero, bairro, CEP, logradouro, email, telefone, senha)
    await database.executar(instrucaoSql)
}

async function cadastrarLocalSensor(razaoSocial, nomeFantasia, responsavelLegal, cnpj, estado, cidade, numero, bairro, CEP, logradouro, email, telefone, senha) {
    var instrucaoSql = `INSERT INTO localsensor (fkCozinha, fkEmpresa) VALUES ((SELECT MAX(idCozinha) from Cozinha), (SELECT max(idEmpresa) from Empresa)), ((SELECT MAX(idCozinha) from Cozinha), (SELECT max(idEmpresa) from Empresa)), ((SELECT MAX(idCozinha) from Cozinha), (SELECT max(idEmpresa) from Empresa));`
    await cadastrarCozinha(razaoSocial, nomeFantasia, responsavelLegal, cnpj, estado, cidade, numero, bairro, CEP, logradouro, email, telefone, senha)
    await database.executar(instrucaoSql)
}

async function cadastrarSensor(razaoSocial, nomeFantasia, responsavelLegal, cnpj, estado, cidade, numero, bairro, CEP, logradouro, email, telefone, senha) {
    var instrucaoSql = `INSERT INTO sensor (sensorStatus, fkCozinha, fkEmpresa, fkLocal) VALUES ('Ativo', (SELECT MAX(idCozinha) from Cozinha), (SELECT max(idEmpresa) from Empresa), (SELECT (MAX(idLocal) - 2) FROM localsensor)), ('Ativo', (SELECT MAX(idCozinha) from Cozinha), (SELECT max(idEmpresa) from Empresa), (SELECT (MAX(idLocal) - 1) FROM localsensor)), ('Ativo', (SELECT MAX(idCozinha) from Cozinha), (SELECT max(idEmpresa) from Empresa), (SELECT (MAX(idLocal)) FROM localsensor));`
    await cadastrarLocalSensor(razaoSocial, nomeFantasia, responsavelLegal, cnpj, estado, cidade, numero, bairro, CEP, logradouro, email, telefone, senha)
    await database.executar(instrucaoSql)
}

async function inserirMedidas(razaoSocial, nomeFantasia, responsavelLegal, cnpj, estado, cidade, numero, bairro, CEP, logradouro, email, telefone, senha) {
    var instrucaoSql = `
    INSERT INTO medida(nivel_gas, fkSensor) VALUES 
        (2.5, (SELECT (MAX(idSensor)) FROM sensor)),
        (5.0, (SELECT (MAX(idSensor)) FROM sensor)),
        (7.5, (SELECT (MAX(idSensor)) FROM sensor)),
        (3.0, (SELECT (MAX(idSensor)) FROM sensor)),
        (6.5, (SELECT (MAX(idSensor)) FROM sensor)),
        (4.0, (SELECT (MAX(idSensor)) FROM sensor)),
        (1.0, (SELECT (MAX(idSensor) - 1) FROM sensor)),
        (2.8, (SELECT (MAX(idSensor) - 1) FROM sensor)),
        (4.5, (SELECT (MAX(idSensor) - 1) FROM sensor)),
        (6.0, (SELECT (MAX(idSensor) - 1) FROM sensor)),
        (5.3, (SELECT (MAX(idSensor) - 1) FROM sensor)),
        (3.0, (SELECT (MAX(idSensor) - 1) FROM sensor)),
        (4.0, (SELECT (MAX(idSensor) - 2) FROM sensor));
        `;
    await cadastrarSensor(razaoSocial, nomeFantasia, responsavelLegal, cnpj, estado, cidade, numero, bairro, CEP, logradouro, email, telefone, senha)
    await database.executar(instrucaoSql)
}

function autenticarEmailModel(email) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function autenticarEmail(): ", email)
    var instrucaoSql = `
        SELECT idUsuario, email FROM usuario WHERE email = '${email}' LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarSenhaModel(senha, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarSenhaModel(): ", senha, idUsuario)
    var instrucaoSql = `
        UPDATE usuario SET senha = '${senha}' WHERE idUsuario = ${idUsuario}
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
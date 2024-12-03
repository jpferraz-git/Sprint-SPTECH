var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT email, senha, fkEmpresa FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(razaoSocial, nomeFantasia, responsavelLegal, cnpj, estado, cidade, numero, bairro, CEP, logradouro, email, telefone, senha){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():" , razaoSocial, nomeFantasia, responsavelLegal, cnpj, cidade, numero, bairro, CEP, telefone, email, senha);
    

    var instrucaoSql = `
        INSERT INTO empresa (razaoSocial, nomeFantasia, responsavelLegal, cnpj, uf, cidade, numero, bairro, CEP, rua, emailEmpresa, telefoneEmpresa) VALUES 
        ('${razaoSocial}', '${nomeFantasia}', '${responsavelLegal}', '${cnpj}', '${estado}', '${cidade}', '${numero}', '${bairro}', '${CEP}',  '${logradouro}', '${email}', '${telefone}');

        `;
    
    var instrucaoSql2 = `
    INSERT INTO usuario (nome, email, senha, fkEmpresa) 
    VALUES ('${nomeFantasia}', '${email}', '${senha}', (SELECT max(idEmpresa) from Empresa));
        
        `;

    var instrucaoSql3 = `INSERT INTO cozinha VALUES (default, 'Comercial', 5, '', 3, 1);`
    
    return database.executar(instrucaoSql), database.executar(instrucaoSql2), database.executar(instrucaoSql3)

}

function autenticarEmailModel(email) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function autenticarEmail(): ", email)
    var instrucaoSql = `
        SELECT email FROM usuario WHERE email = '${email}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarSenhaModel(novaSenha, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarSenhaModel(): ", novaSenha, idUsuario)
    var instrucaoSql = `
        UPDATE usuario SET senha = ${senha} WHERE idUsuario = ${idUsuario}
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}




module.exports = {
    autenticar,
    cadastrar,
    autenticarEmailModel,
    atualizarSenhaModel
};
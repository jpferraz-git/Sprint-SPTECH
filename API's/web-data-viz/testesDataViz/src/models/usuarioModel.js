var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT email, senha FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(razaoSocial, nomeFantasia, responsavelLegal, cnpj, estado, cidade, bairro, CEP, logradouro, email, telefone, senha){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():" , razaoSocial, nomeFantasia, responsavelLegal, cnpj, cidade, bairro, CEP, telefone, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO empresa (razaoSocial, nomeFantasia, CNPJ, uf, bairro, cidade, numero, cep, telefoneEmpresa, emailEmpresa) VALUES 
        ('${razaoSocial}', '${nomeFantasia}', '${cnpj}', '${estado}', '${bairro}', '${cidade}', '${logradouro}', '${CEP}', '${telefone}', '${email}');

        `;
    
    var instrucaoSql2 = `
    INSERT INTO usuario (nome, email, senha, fkEmpresa) 
    VALUES ('${nomeFantasia}', '${email}', '${senha}', (SELECT max(idEmpresa) from Empresa));
        
        `;
    
    return database.executar(instrucaoSql), database.executar(instrucaoSql2)

}


module.exports = {
    autenticar,
    cadastrar
    
   
};
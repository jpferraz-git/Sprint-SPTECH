var database = require("../database/config");

function buscarCozinhasPorEmpresa(idUsuario) {
  var instrucaoSql = `select * from cozinha where fkempresa = ${idUsuario}`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(idUsuario) {
  var instrucaoSql = `insert into cozinha (fkempresa) values (${idUsuario})`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  cadastrar,
  buscarCozinhasPorEmpresa
}

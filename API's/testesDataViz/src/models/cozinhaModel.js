var database = require("../database/config");

function buscarCozinhasPorEmpresa(idUsuario) {

  var instrucaoSql = `SELECT * FROM cozinha WHERE fkEmpresa = ${idUsuario}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(idUsuario) {
  
  var instrucaoSql = `INSERT INTO (fkEmpresa) cozinha VALUES (${idUsuario})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  cadastrar,
  buscarCozinhasPorEmpresa
}

var database = require("../database/config");

function capturarKpiAtivos(idCozinha, idEmpresa) {
  var instrucaoSql = `SELECT COUNT(idSensor) as qtdAtivos FROM sensor WHERE fkCozinha = ${idCozinha} AND fkEmpresa = ${idEmpresa}`;

  return database.executar(instrucaoSql);
}


module.exports = {
  capturarKpiAtivos
}

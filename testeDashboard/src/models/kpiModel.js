var database = require("../database/config");

function capturarKpiAtivos(idCozinha, idEmpresa) {
  var instrucaoSql = `SELECT COUNT(idSensor) as qtdAtivos FROM sensor WHERE fkCozinha = ${idCozinha} AND fkEmpresa = ${idEmpresa} AND sensorStatus = 'Ativo';`;

  return database.executar(instrucaoSql);
}

function capturarKpiInoperante(idCozinha, idEmpresa) {
  var instrucaoSql = `SELECT COUNT(idSensor) as qtdInoperante FROM sensor WHERE fkCozinha = ${idCozinha} AND fkEmpresa = ${idEmpresa} AND sensorStatus = 'Inativo'`;

  return database.executar(instrucaoSql);
}

module.exports = {
  capturarKpiAtivos,
  capturarKpiInoperante
}

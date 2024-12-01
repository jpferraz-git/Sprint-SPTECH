var database = require("../database/config");

function capturarKpiAtivos(idCozinha, idEmpresa) {
    var instrucaoSql = `
        SELECT COUNT(idSensor) as qtdAtivos FROM sensor WHERE fkCozinha = ${idCozinha} AND fkEmpresa = ${idEmpresa} AND sensorStatus = 'Ativo';
    `;

    return database.executar(instrucaoSql);
}

function capturarKpiInoperante(idCozinha, idEmpresa) {
    var instrucaoSql = `
        SELECT COUNT(idSensor) as qtdInoperante FROM sensor WHERE fkCozinha = ${idCozinha} AND fkEmpresa = ${idEmpresa} AND sensorStatus = 'Inativo';
    `;

    return database.executar(instrucaoSql);
}

function capturarKpiNiveis(idCozinha, idEmpresa) {
    var instrucaoSql = `
    SELECT 
        SUM(CASE WHEN nivel_gas BETWEEN 0 AND 10 THEN 1 ELSE 0 END) AS qtdNormal,
        SUM(CASE WHEN nivel_gas BETWEEN 11 AND 20 THEN 1 ELSE 0 END) AS qtdAlerta,
        SUM(CASE WHEN nivel_gas > 20 THEN 1 ELSE 0 END) AS qtdPerigo
    FROM medida JOIN sensor ON fkSensor = idSensor WHERE fkCozinha = ${idCozinha} AND fkEmpresa = ${idEmpresa};
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    capturarKpiAtivos,
    capturarKpiInoperante,
    capturarKpiNiveis
}

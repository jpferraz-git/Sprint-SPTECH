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

function capturarKpiValores(idCozinha, idEmpresa) {
    var instrucaoSql = `
    SELECT 
        s.idSensor as idSensor,
        s.nomeSensor,
        m.nivel_gas as medidaSensor,
        m.dtLeitura
    FROM sensor s
    JOIN medida m ON s.idSensor = m.fkSensor
    JOIN (
        SELECT fkSensor, MAX(dtLeitura) AS ultimaLeitura
        FROM medida
        GROUP BY fkSensor
    ) ultimas ON m.fkSensor = ultimas.fkSensor AND m.dtLeitura = ultimas.ultimaLeitura
    WHERE s.fkCozinha = ${idCozinha} AND s.fkEmpresa = ${idEmpresa};
    `;

    return database.executar(instrucaoSql);
}

function qtdAlertasDia(idCozinha, idEmpresa, idSensor) {
    var instrucaoSql = `
    SELECT 
        SUM(CASE WHEN nivel_gas >= 10 AND nivel_gas < 30 THEN 1 ELSE 0 END) AS qtdAlertas,
        SUM(CASE WHEN nivel_gas >= 30 THEN 1 ELSE 0 END) AS qtdPerigos
    FROM medida m
    JOIN sensor s ON m.fkSensor = s.idSensor
    WHERE s.fkCozinha = ${idCozinha}
        AND s.fkEmpresa = ${idEmpresa}
        AND m.fkSensor = ${idSensor}
        AND DATE(m.dtLeitura) = CURDATE();
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    capturarKpiAtivos,
    capturarKpiInoperante,
    capturarKpiNiveis,
    capturarKpiValores,
    qtdAlertasDia
}

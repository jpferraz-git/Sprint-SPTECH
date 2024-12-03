var database = require("../database/config");

function ultimasMedidas(idCozinha, idEmpresa) {
    var instrucaoSql = `
        SELECT m.fkSensor, m.nivel_gas, m.dtLeitura
        FROM medida m
        JOIN sensor s ON m.fkSensor = s.idSensor
        WHERE s.fkCozinha = ${idCozinha}
            AND s.fkEmpresa = ${idEmpresa}
            AND (
            SELECT COUNT(*) 
            FROM medida m2
            WHERE m2.fkSensor = m.fkSensor AND m2.dtLeitura >= m.dtLeitura
            ) <= 5
        ORDER BY m.fkSensor, m.dtLeitura DESC;
    `;
    return database.executar(instrucaoSql);
}

function ultimasMedidas(idSensor) {
    var instrucaoSql = `
        SELECT idMedida, nivel_gas, dtLeitura, fkSensor
        FROM medida
        WHERE fkSensor = ${idSensor}
        ORDER BY dtLeitura DESC
        LIMIT 1;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    ultimasMedidas,
    dadosTempoReal
}

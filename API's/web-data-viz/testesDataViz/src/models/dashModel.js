var database = require("../database/config");

function ultimasMedidas(idCozinha, idEmpresa) {
    var instrucaoSql = `
        SELECT m.fkSensor as idSensor, m.nivel_gas as nivel_gas, m.dtLeitura
        FROM medida m
        JOIN sensor s ON m.fkSensor = s.idSensor
        WHERE s.fkCozinha = ${idCozinha}
            AND s.fkEmpresa = ${idEmpresa}
            AND (
            SELECT COUNT(*) 
            FROM medida m2
            WHERE m2.fkSensor = m.fkSensor AND m2.idMedida >= m.idMedida
            ) <= 6
        ORDER BY m.fkSensor, m.idMedida DESC;
    `;
    return database.executar(instrucaoSql);
}

function dadosTempoReal(idSensor) {
    var instrucaoSql = `
        SELECT idMedida, nivel_gas, dtLeitura, fkSensor
        FROM medida
        WHERE fkSensor = ${idSensor}
        ORDER BY idMedida DESC
        LIMIT 1;
    `;
    return database.executar(instrucaoSql);
}

function dadosTempoRealPrincipal(idCozinha, idEmpresa) {
    var instrucaoSql = `
    SELECT 
        s.idSensor AS idSensor,
        s.nomeSensor,
        m.nivel_gas AS medidaSensor,
        m.dtLeitura
    FROM sensor s
    JOIN medida m ON s.idSensor = m.fkSensor
    WHERE s.fkCozinha = ${idCozinha}
    AND s.fkEmpresa = ${idEmpresa}
    AND m.idMedida = (
        SELECT m2.idMedida
        FROM medida m2
        WHERE m2.fkSensor = m.fkSensor
        ORDER BY m2.dtLeitura DESC, m2.idMedida DESC
        LIMIT 1
    )
    ORDER BY s.idSensor;
    `;

    return database.executar(instrucaoSql);
}

function mediaSemana(idCozinha, idEmpresa) {
    var instrucaoSql = `
    SELECT 
        m.fkSensor AS idSensor,
        DAYNAME(m.dtLeitura) AS diaSemana,
        AVG(m.nivel_gas) AS mediaNivelGas
    FROM medida m
    JOIN sensor s ON m.fkSensor = s.idSensor
    JOIN cozinha c ON s.fkCozinha = c.idCozinha
    WHERE c.idCozinha = ${idCozinha}
    AND s.fkEmpresa = ${idEmpresa}
    GROUP BY m.fkSensor, DAYNAME(m.dtLeitura)
    ORDER BY m.fkSensor, FIELD(diaSemana, 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    ultimasMedidas,
    dadosTempoReal,
    dadosTempoRealPrincipal,
    mediaSemana
}

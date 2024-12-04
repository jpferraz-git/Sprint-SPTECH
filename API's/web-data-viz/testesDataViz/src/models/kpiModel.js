var database = require("../database/config");

function capturarKpiAtivos(idCozinha, idEmpresa) {
    var instrucaoSql = `
        select count(idsensor) as qtdativos from sensor where fkcozinha = ${idCozinha} and fkempresa = ${idEmpresa} and sensorstatus = 'ativo';
    `;
    return database.executar(instrucaoSql);
}

function capturarKpiInoperante(idCozinha, idEmpresa) {
    var instrucaoSql = `
        select count(idsensor) as qtdinoperante from sensor where fkcozinha = ${idCozinha} and fkempresa = ${idEmpresa} and sensorstatus = 'inativo';
    `;
    return database.executar(instrucaoSql);
}

function capturarKpiNiveis(idCozinha, idEmpresa) {
    var instrucaoSql = `
    select 
        sum(case when medidasrecentes.nivel_gas between 0 and 10 then 1 else 0 end) as qtdnormal,
        sum(case when medidasrecentes.nivel_gas between 11 and 30 then 1 else 0 end) as qtdalerta,
        sum(case when medidasrecentes.nivel_gas > 30 then 1 else 0 end) as qtdperigo
    from (
        select m.fksensor, m.nivel_gas
        from medida m
        join (
            select fksensor, max(idmedida) as ultimamedida
            from medida
            group by fksensor
        ) ultimas on m.fksensor = ultimas.fksensor and m.idmedida = ultimas.ultimamedida
        join sensor s on m.fksensor = s.idsensor
        where s.fkcozinha = ${idCozinha} and s.fkempresa = ${idEmpresa}
    ) medidasrecentes;
    `;
    return database.executar(instrucaoSql);
}

function capturarKpiValores(idCozinha, idEmpresa) {
    var instrucaoSql = `
    select 
        s.idsensor as idsensor,
        m.nivel_gas as medidasensor,
        m.dtleitura
    from sensor s
    join medida m on s.idsensor = m.fksensor
    where s.fkcozinha = ${idCozinha} 
    and s.fkempresa = ${idEmpresa}
    and m.idmedida = (
        select m2.idmedida
        from medida m2
        where m2.fksensor = m.fksensor
        order by m2.idmedida desc
        limit 1
    )
    order by s.idsensor;
    `;
    return database.executar(instrucaoSql);
}

function qtdAlertasDia(idCozinha, idEmpresa, idSensor) {
    var instrucaoSql = `
    select 
        sum(case when nivel_gas >= 10 and nivel_gas < 30 then 1 else 0 end) as qtdalertas,
        sum(case when nivel_gas >= 30 then 1 else 0 end) as qtdperigos
    from medida m
    join sensor s on m.fksensor = s.idsensor
    where s.fkcozinha = ${idCozinha}
        and s.fkempresa = ${idEmpresa}
        and m.fksensor = ${idSensor}
        and date(m.dtleitura) = curdate();
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

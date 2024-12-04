var database = require("../database/config");

function ultimasMedidas(idCozinha, idEmpresa) {
    var instrucaoSql = `
        select m.fksensor as idsensor, m.nivel_gas as nivel_gas, m.dtleitura
        from medida m
        join sensor s on m.fksensor = s.idsensor
        where s.fkcozinha = ${idCozinha}
            and s.fkempresa = ${idEmpresa}
            and (
            select count(*) 
            from medida m2
            where m2.fksensor = m.fksensor and m2.idmedida >= m.idmedida
            ) <= 6
        order by m.fksensor, m.idmedida desc;
    `;
    return database.executar(instrucaoSql);
}

function dadosTempoReal(idSensor) {
    var instrucaoSql = `
        select idmedida, nivel_gas, dtleitura, fksensor
        from medida
        where fksensor = ${idSensor}
        order by idmedida desc
        limit 1;
    `;
    return database.executar(instrucaoSql);
}

function dadosTempoRealPrincipal(idCozinha, idEmpresa) {
    var instrucaoSql = `
    select 
        s.idsensor as idsensor,
        s.nomesensor,
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
        order by m2.dtleitura desc, m2.idmedida desc
        limit 1
    )
    order by s.idsensor;
    `;

    return database.executar(instrucaoSql);
}

function mediaSemana(idCozinha, idEmpresa) {
    var instrucaoSql = `
    select 
        m.fksensor as idsensor,
        dayname(m.dtleitura) as diasemana,
        avg(m.nivel_gas) as medianivelgas
    from medida m
    join sensor s on m.fksensor = s.idsensor
    join cozinha c on s.fkcozinha = c.idcozinha
    where c.idcozinha = ${idCozinha}
    and s.fkempresa = ${idEmpresa}
    group by m.fksensor, dayname(m.dtleitura)
    order by m.fksensor, field(diasemana, 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    ultimasMedidas,
    dadosTempoReal,
    dadosTempoRealPrincipal,
    mediaSemana
}

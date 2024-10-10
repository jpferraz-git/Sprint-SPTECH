function calcularPerda() {
    const nome = input_nome.value
    const valorInvestido = Number(input_valor.value)
    const qtdFuncionario = Number(input_qtd_funcionario.value)
    const faturamentoDia = Number(input_faturamento_mensal.value / 30)

    // Fiscalização
    const valorFiscalizacao = 230_000
    const faturaMentoPerdidoFisc = faturamentoDia * 7
    const valorTotalFisc = valorFiscalizacao + faturaMentoPerdidoFisc

    // Explosão
    const faturaMentoPerdidoExplo = faturamentoDia * 30
    const funcAfetadosGravemente = parseInt(qtdFuncionario * 0.3)
    const valoresFuncionariosExplo =
        1500 + 1500 + // Consulta + Exame
        (2500 * 10 * funcAfetadosGravemente) + // Custo por Dia de Internação * Dias que Ficará Internado * Funcionário Afetas Gravemente
        (350 * 15) + // Custo por Sessão de Fisioterapia e Quantidade de Sessões
        500 // Tratamento Médico

    const valorTotalExplo = valorInvestido + faturaMentoPerdidoExplo + valoresFuncionariosExplo

    const estiloReal = {style: 'currency', currency: 'BRL'}

    div_mostrar_calculo.innerHTML = `
    <h2>Prejuízo Total: ${(valorTotalExplo+valorFiscalizacao).toLocaleString('pt-br', estiloReal)}</h2>
    <p>Em caso de <b>Fiscalização</b>, você poderá ser afetado da seguinte maneira:</p>
    <ol>
        <li>Dias fechados até a regularização - 7</li>
        <li>Perda no faturamento - ${faturaMentoPerdidoFisc.toLocaleString('pt-br', estiloReal)}</li>
        <li>Multa por estar em irregularidade com a norma NBR 15526 - ${valorFiscalizacao.toLocaleString('pt-br', estiloReal)}</li>
    </ol>
    <p>Porém, caso uma <b>Explosão</b> aconteça, os prejuízos serão mais expressivos:</p>
    <ol>
        <li>Dias fechados até a reconstrução da cozinha - 30</li>
        <li>Perda no faturamento - ${faturaMentoPerdidoExplo.toLocaleString('pt-br', estiloReal)}</li>
        <li>Perda dos TOTAL dos equipamentos - ${valorInvestido.toLocaleString('pt-br', estiloReal)}</li>
        <li>Gastos com tratamento médico dos funcionários - ${valoresFuncionariosExplo.toLocaleString('pt-br', estiloReal)}
    </ol>
    `
}
$(document).ready(function(){
    $('#input_valor').mask('000.000.000.000.000,00', {reverse: true})
    $('#input_faturamento_mensal').mask('000.000.000.000.000,00', {reverse: true})
  });

function clearDiv(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('input_valor').value = '';
    document.getElementById('input_qtd_funcionario').value = '';
    document.getElementById('input_faturamento_mensal').value = '';

    document.getElementById('div_mostrar_calculo').style="opacity: 20%;";
}

function calcularPerda() {
    div_mostrar_calculo.innerHTML=``

    input_valor.value = input_valor.value.replace('.','')
    input_valor.value = input_valor.value.replace(',00','')
    console.log(input_valor.value)

    input_faturamento_mensal.value = input_faturamento_mensal.value.replace('.','')
    input_faturamento_mensal.value = input_faturamento_mensal.value.replace(',00','')
    console.log(input_faturamento_mensal.value)

    // const nome = input_nome.value
    const valorInvestido = Number(input_valor.value)
    const qtdFuncionario = Number(input_qtd_funcionario.value)
    const faturamentoDia = Number(input_faturamento_mensal.value / 30)

    // Fiscalização
    const valorFiscalizacao = 230_000
    const faturaMentoPerdidoFisc = faturamentoDia * 7
    const valorTotalFisc = valorFiscalizacao + faturaMentoPerdidoFisc

    // Explosão
    const faturaMentoPerdidoExplo = (faturamentoDia * 30)*6
    const funcAfetadosGravemente = parseInt(qtdFuncionario * 0.3)
    const valoresFuncionariosExplo =
        (1500 + 1500 + // Consulta + Exame
        (2500 * 10 * funcAfetadosGravemente) + // Custo por Dia de Internação * Dias que Ficará Internado * Funcionário Afetas Gravemente
        (350 * 15) + // Custo por Sessão de Fisioterapia e Quantidade de Sessões
        500) // Tratamento Médico
        *qtdFuncionario

    

    const valorTotalExplo = valorInvestido + faturaMentoPerdidoExplo + valoresFuncionariosExplo

    const estiloReal = {style: 'currency', currency: 'BRL'}

    div_mostrar_calculo.innerHTML = `
    <div class="divResultado">

    <h1>Sem a nossa solução você terá um Prejuízo Total de até <u>${(valorTotalExplo+valorFiscalizacao).toLocaleString('pt-br', estiloReal)}</u>!!</h1>

<div class="divResultadoDentro">

    <div class="divResultadoUm">
        <div class="divUmSubtitulo">
    Em caso de <b>FISCALIZAÇÃO</b>
        </div>
        <div class="divUmDescricao">
        Dias fechados até a regularização: <text>7 dias</text>
        Perda no faturamento: <text>${faturaMentoPerdidoFisc.toLocaleString('pt-br', estiloReal)} </text>
        Multa por estar em irregularidade com a norma NBR 15526*: <text>${valorFiscalizacao.toLocaleString('pt-br', estiloReal)}</text>
        <small>
            *A Norma <a href="https://www.mjinstalacoes.com.br/wp-content/uploads/2018/04/ABNT-NBR-15526-2016-Atualizada.pdf" target="_blank">NBR 15526</a> estabelece requisitos para a instalação segura e eficiente de sistemas de gás em edificações, abrangendo tubulações, componentes e procedimentos de segurança.
        </small> 
        </div>
    </div>

    <div class="divResultadoDois">
        <div class="divDoisSubtitulo">
    Em caso de <b>EXPLOSÃO</b>
        </div>
        <div class="divDoisDescricao">
        Período inativo até a reconstrução da cozinha pode chegar até <text>6 meses</text>
        Perda no faturamento: <text>${faturaMentoPerdidoExplo.toLocaleString('pt-br', estiloReal)}</text>
        Perda TOTAL dos equipamentos: <text>${valorInvestido.toLocaleString('pt-br', estiloReal)}</text>
        Gastos com tratamento médico dos funcionários: <text>${valoresFuncionariosExplo.toLocaleString('pt-br', estiloReal)}</text>
        <small>
            *DE ACORDO COM AS INFORMAÇÕES DA <br><a href="https://www.rbqueimaduras.com.br/details/545/pt-br/avaliacao-dos-custos-de-um-centro-de-tratamento-de-queimados" target="_blank">revista brasileira de queimaduras</a>.
        </small>
        </div>
    </div>

</div>

    </div>

        <button class="btn" onclick="clearDiv()">Calcular novamente</button>
            <a href="../Cadastro_e_Login/cadastro2.html"><button class="btn">Quero me Cadastrar e ter acesso a Solução</button></a>
    `
    div_mostrar_calculo.scrollIntoView({behavior: 'smooth' });
    document.getElementById('div_mostrar_calculo').style="opacity: 100%;";
}
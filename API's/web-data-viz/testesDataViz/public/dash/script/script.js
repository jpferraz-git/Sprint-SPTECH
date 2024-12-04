function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function atualizarDataHora() {
    let data_geral = new Date();
    let dataFormatada = data_geral.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    let horaFormatada = data_geral.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    let dataHoraFormatada = `${dataFormatada} ${horaFormatada}`;
    const mostrar_data = document.querySelector('#hora_atual');
    mostrar_data.textContent = dataHoraFormatada;
}

var telaAtual = ``;

function trocarDash(tela) {
    // Trazendo os graficos
    var dashGeral = document.getElementById('dash-geral')
    var dashFg1 = document.getElementById('dash-fg1')
    var dashFg2 = document.getElementById('dash-fg2')
    var dashFn = document.getElementById('dash-fn')

    var buttonFg1 = document.getElementById('button-fg1')
    var buttonFg2 = document.getElementById('button-fg2')
    var buttonFn = document.getElementById('button-fn')

    var containerFg1 = document.getElementById('fg1')
    var containerFg2 = document.getElementById('fg2')
    var containerFn = document.getElementById('fn')

    // Verificando para qual tela deve trocar
    if (tela == 'fg1') {
        //Fazendo a tela aparecer
        dashGeral.style.display = 'none';
        dashFg1.style.display = 'flex';
        dashFg2.style.display = 'none';
        dashFn.style.display = 'none';

        // Colocando uma borda para mostrar que foi selecionado
        containerFg1.style.border = '2px solid #EFB661';
        containerFg2.style.border = 'none';
        containerFn.style.border = 'none';

        // Trocando o parametro da função
        buttonFg1.onclick = function () { trocarDash('geral') };
        buttonFg2.onclick = function () { trocarDash('fg2'); qtdAlertasDia(idSensorFg2, `qtdRuimFg2`, `qtdPerigosoFg2`) };
        buttonFn.onclick = function () { trocarDash('fn'); qtdAlertasDia(idSensorFn, `qtdRuimFn`, `qtdPerigosoFn`) };
    } else if (tela == 'fg2') {
        dashGeral.style.display = 'none';
        dashFg1.style.display = 'none';
        dashFg2.style.display = 'flex';
        dashFn.style.display = 'none';

        containerFg1.style.border = 'none';
        containerFg2.style.border = '2px solid #EFB661';
        containerFn.style.border = 'none';

        buttonFg1.onclick = function () { trocarDash('fg1'); qtdAlertasDia(idSensorFg1, `qtdRuimFg1`, `qtdPerigosoFg1`) }
        buttonFg2.onclick = function () { trocarDash('geral') }
        buttonFn.onclick = function () { trocarDash('fn'); qtdAlertasDia(idSensorFn, `qtdRuimFn`, `qtdPerigosoFn`) }
    } else if (tela == 'fn') {
        dashGeral.style.display = 'none';
        dashFg1.style.display = 'none';
        dashFg2.style.display = 'none';
        dashFn.style.display = 'flex';

        containerFg1.style.border = 'none';
        containerFg2.style.border = 'none';
        containerFn.style.border = '2px solid #EFB661';

        buttonFg1.onclick = function () { trocarDash('fg1'); qtdAlertasDia(idSensorFg1, `qtdRuimFg1`, `qtdPerigosoFg1`) }
        buttonFg2.onclick = function () { trocarDash('fg2'); qtdAlertasDia(idSensorFg2, `qtdRuimFg2`, `qtdPerigosoFg2`) }
        buttonFn.onclick = function () { trocarDash('geral') }
    } else if (tela == 'geral') {
        dashGeral.style.display = 'flex';
        dashFg1.style.display = 'none';
        dashFg2.style.display = 'none';
        dashFn.style.display = 'none';

        containerFg1.style.border = 'none';
        containerFg2.style.border = 'none';
        containerFn.style.border = 'none';

        buttonFg1.onclick = function () { trocarDash('fg1'); qtdAlertasDia(idSensorFg1, `qtdRuimFg1`, `qtdPerigosoFg1`) }
        buttonFg2.onclick = function () { trocarDash('fg2'); qtdAlertasDia(idSensorFg2, `qtdRuimFg2`, `qtdPerigosoFg2`) }
        buttonFn.onclick = function () { trocarDash('fn'); qtdAlertasDia(idSensorFn, `qtdRuimFn`, `qtdPerigosoFn`) }
    }
    telaAtual = tela;
}

function capturarKpiAtivos() {
    var idCozinha = sessionStorage.ID_COZINHA;
    var idEmpresa = sessionStorage.ID_EMPRESA;

    fetch(`/kpis/capturarKpiAtivos/${idCozinha}/${idEmpresa}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                sensorAtivos.innerHTML = json[0].qtdAtivos
            })

            setTimeout(() => capturarKpiAtivos(), 5000);
        } else {
            console.log(`Houve um erro ao carregar o número de sensores ativos`)
            resposta.text().then(texto => {
                console.error(texto);
            })
            setTimeout(() => capturarKpiAtivos(), 5000);
        }
    }).catch(erro => {
        console.log(erro)
    })
}

function capturarKpiInoperante() {
    var idCozinha = sessionStorage.ID_COZINHA;
    var idEmpresa = sessionStorage.ID_EMPRESA;

    fetch(`/kpis/capturarKpiInoperante/${idCozinha}/${idEmpresa}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                sensorInoperante.innerHTML = json[0].qtdInoperante
            })
            setTimeout(() => capturarKpiInoperante(), 5000);
        } else {
            console.log(`Houve um erro ao carregar o número de sensores inativos`)
            resposta.text().then(texto => {
                console.error(texto);
            })
            setTimeout(() => capturarKpiInoperante(), 5000);
        }
    }).catch(erro => {
        console.log(erro)
    })
}

function capturarKpiNiveis() {
    var idCozinha = sessionStorage.ID_COZINHA;
    var idEmpresa = sessionStorage.ID_EMPRESA;

    fetch(`/kpis/capturarKpiNiveis/${idCozinha}/${idEmpresa}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(json)
                if (json[0].qtdNormal != null) {
                    sensorNormal.innerHTML = json[0].qtdNormal
                } else {
                    sensorNormal.innerHTML = 0
                }

                if (json[0].qtdAlerta != null) {
                    sensorAlerta.innerHTML = json[0].qtdAlerta
                } else {
                    sensorAlerta.innerHTML = 0
                }

                if (json[0].qtdPerigo != null) {
                    sensorPerigo.innerHTML = json[0].qtdPerigo
                } else {
                    sensorPerigo.innerHTML = 0
                }
            })
            setTimeout(() => capturarKpiNiveis(), 5000);
        } else {
            console.log(`Houve um erro ao carregar o número de sensores em cada nivel`)
            resposta.text().then(texto => {
                console.error(texto);
            })
            setTimeout(() => capturarKpiNiveis(), 5000);
        }
    }).catch(erro => {
        console.log(erro)
    })
}

var idSensorFg1;
var idSensorFg2;
var idSensorFn;

function capturarKpiValores(primeiraVez = true) {
    var idCozinha = sessionStorage.ID_COZINHA;
    var idEmpresa = sessionStorage.ID_EMPRESA;

    fetch(`/kpis/capturarKpiValores/${idCozinha}/${idEmpresa}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                var ultMedFg1 = document.getElementById('porcentagemFg1');
                var ultMedFg2 = document.getElementById('porcentagemFg2');
                var ultMedFn = document.getElementById('porcentagemFn');

                var botaoTelaFg1 = document.getElementById('button-fg1');
                var botaoTelaFg2 = document.getElementById('button-fg2');
                var botaoTelaFn = document.getElementById('button-fn');

                function definirClasse(tela, botao, elemento, medida, idSensor, equipamento, kpiAlerta, kpiPergio) {
                    if (medida < 10) {
                        elemento.innerHTML = medida
                        elemento.className = 'normal';
                        tela.className = 'status normal';
                        botao.textContent = 'Normal';
                    } else if (medida < 30) {
                        elemento.innerHTML = medida
                        elemento.className = 'alerta';
                        tela.className = 'status alerta';
                        botao.textContent = 'Alerta';
                    } else {
                        elemento.innerHTML = medida
                        elemento.className = 'perigo';
                        tela.className = 'status perigo';
                        botao.textContent = 'Perigo';
                    }
                    elemento.textContent = medida;
                    botao.onclick = () => {
                        trocarDash(equipamento);
                        qtdAlertasDia(idSensor, kpiAlerta, kpiPergio);
                    };
                }

                definirClasse(telaFg1, botaoTelaFg1, ultMedFg1, json[0].medidaSensor, json[0].idSensor, 'fg1', `qtdRuimFg1`, `qtdPerigosoFg1`);
                definirClasse(telaFg2, botaoTelaFg2, ultMedFg2, json[1].medidaSensor, json[1].idSensor, 'fg2', `qtdRuimFg2`, `qtdPerigosoFg2`);
                definirClasse(telaFn, botaoTelaFn, ultMedFn, json[2].medidaSensor, json[2].idSensor, 'fn', `qtdRuimFn`, `qtdPerigosoFn`);

                idSensorFg1 = json[0].idSensor;
                idSensorFg2 = json[1].idSensor;
                idSensorFn = json[2].idSensor;

                obterDados()
                mediaSemana()
            });
            setTimeout(() => capturarKpiValores(false), 5000);
        } else {
            console.error("Erro ao carregar os KPIs");
            resposta.text().then(texto => console.error(texto));
            setTimeout(() => capturarKpiValores(false), 5000);
        }
    }).catch(erro => {
        console.error("Erro de conexão ou processamento:", erro);
    });
};

function qtdAlertasDia(idSensor, kpiAlerta, kpiPerigo) {
    var idCozinha = sessionStorage.ID_COZINHA;
    var idEmpresa = sessionStorage.ID_EMPRESA;

    fetch(`/kpis/qtdAlertasDia/${idCozinha}/${idEmpresa}/${idSensor}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(json[0].qtdAlertas)
                console.log(json[0].qtdPerigos)

                var kpiQtdAlerta = document.getElementById(kpiAlerta)
                var kpiQtdPerigo = document.getElementById(kpiPerigo)

                kpiQtdAlerta.innerHTML = 0;
                kpiQtdPerigo.innerHTML = 0;
                if (json[0].qtdAlertas != undefined && json[0].qtdAlertas != null) {
                    kpiQtdAlerta.innerHTML = json[0].qtdAlertas;
                }
                if (json[0].qtdPerigos != undefined && json[0].qtdPerigos != null) {
                    kpiQtdPerigo.innerHTML = json[0].qtdPerigos;
                }
            })
            setTimeout(() => qtdAlertasDia(idSensor, kpiAlerta, kpiPerigo), 2000);
        } else {
            console.log(`Houve um erro ao carregar a quantidade de alertas do dia`)
            resposta.text().then(texto => {
                console.error(texto);
            })
            setTimeout(() => qtdAlertasDia(idSensor, kpiAlerta, kpiPerigo), 2000);
        }
    }).catch(erro => {
        console.log(erro)
    })
}

var borderFg1 = 'rgb(241,101,41)'
var borderFg2 = 'rgb(205,5,5)'
var borderFn = 'rgb(40,106,174)'
var backgroundFg1 = 'rgb(241,101,41)'
var backgroundFg2 = 'rgb(205,5,5)'
var backgroundFn = 'rgb(40,106,174)'

function obterDados() {
    var idCozinha = sessionStorage.ID_COZINHA;
    var idEmpresa = sessionStorage.ID_EMPRESA;

    fetch(`/dash/ultimasMedidas/${idCozinha}/${idEmpresa}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(json)
                const medidasFg1 = []
                const medidasFg2 = []
                const medidasFn = []
                for (var i = json.length - 1; i >= 0; i--) {
                    if (json[i].idSensor == idSensorFg1) {
                        medidasFg1.push(json[i].nivel_gas)
                    } else if (json[i].idSensor == idSensorFg2) {
                        medidasFg2.push(json[i].nivel_gas)
                    } else if (json[i].idSensor == idSensorFn) {
                        medidasFn.push(json[i].nivel_gas)
                    }
                }

                plotagemGraficoPrincipal(medidasFg1, medidasFg2, medidasFn)

                plotagemGraficoIndividualFg1(medidasFg1);
                plotagemGraficoIndividualFg2(medidasFg2);
                plotagemGraficoIndividualFn(medidasFn);
            })
        } else {
            console.log(`Houve um erro ao carregar a quantidade de alertas do dia`)
            resposta.text().then(texto => {
                console.error(texto);
            })
        }
    }).catch(erro => {
        console.log(erro)
    })
}

function plotagemGraficoPrincipal(medidasFg1, medidasFg2, medidasFn) {
    const grafico_minuto = document.querySelector("#grafico_minutos") 
    
    const labels_line_min = ['0', '1min', '2min', '3min', '4min', '5min']

    const data_minuto = {
        labels: labels_line_min,
        datasets: [
            {
                label: 'Fogão 01',
                data: medidasFg1,
                tension: 0,
                borderColor: borderFg1,
                backgroundColor: backgroundFg1,
            },
            {
                label: 'Fogão 02',
                data: medidasFg2,
                tension: 0,
                borderColor: borderFg2,
                backgroundColor: backgroundFg2,
            },
            {
                label: 'Forno',
                data: medidasFn,
                tension: 0,
                borderColor: borderFn,
                backgroundColor: backgroundFn,
            },
            {
                label: '',
                data: [30, 30, 30, 30, 30, 30],
                tension: 0,
                borderColor: 'rgb(205,5,5)',
                backgroundColor: 'rgb(205,5,5, 0.1)',
                borderDash: [5, 5],
                pointRadius: 0,
                fill: 'end'
            },
            {
                label: '',
                data: [10, 10, 10, 10, 10, 10],
                tension: 0,
                borderColor: 'rgb(241,101,41)',
                backgroundColor: 'rgb(241,101,41, 0.2)',
                borderDash: [5, 5],
                pointRadius: 0,
                fill: 'end'
            },
            {
                label: '',
                data: [10, 10, 10, 10, 10, 10],
                tension: 0,
                backgroundColor: 'rgb(40,106,174, 0.2)',
                borderDash: [5, 5],
                pointRadius: 0,
                fill: 'start'
            }
        ]
    }
    
    const config_minuto = {
        type: 'line',
        data: data_minuto,
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: 'gray',
                        font: {
                            size: 12,
                            family: 'Montserrat',
                            weight: 'bold',
                        },
                        filter: function (legendItem) {
                            return legendItem.text !== '';
                        }
                    },
                    onClick: null
                },
                title: {
                    display: true,
                    text: 'Média dos últimos 5 Minutos',
                    padding: 0.5,
                    color: '#000000',
                    font: {
                        size: 16,
                        family: 'Montserrat',
                    }
                }
            },
            elements: {
                point: {
                    radius: 5
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    min: 0,
                    max: 100
                }
            }
        }
    }
    
    const graficoMinuto = new Chart(grafico_minuto, config_minuto);
    setTimeout(() => dadosTempoRealPrincipal(graficoMinuto, data_minuto), 60000)
}

function dadosTempoRealPrincipal(chart, dados) {
    var idCozinha = sessionStorage.ID_COZINHA
    var idEmpresa = sessionStorage.ID_EMPRESA

    fetch(`/dash/dadosTempoRealPrincipal/${idCozinha}/${idEmpresa}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(dados)
                console.log(json)
                dados.datasets[0].data.shift();
                dados.datasets[0].data.push(json[0].medidaSensor);

                dados.datasets[1].data.shift();
                dados.datasets[1].data.push(json[1].medidaSensor);

                dados.datasets[2].data.shift();
                dados.datasets[2].data.push(json[2].medidaSensor);

                chart.update();
            })
            setTimeout(() => dadosTempoRealPrincipal(chart, dados), 60000)
        } else {
            console.log(`Houve um erro ao carregar a ultima medida do sensor`)
            resposta.text().then(texto => {
                console.error(texto);
            })
            setTimeout(() => dadosTempoRealPrincipal(chart, dados), 60000)
        }
    }).catch(erro => {
        console.log(erro)
    })
}

function plotagemGraficoIndividualFg1(medidasFg1) {
    const grafico_segundo_fg1 = document.querySelector("#grafico_segundos_fg1") 
    
    const labels_line_seg = ['0', '1s', '2s', '3s', '4s', '5s']

    const data_segundo_fg1 = {
        labels: labels_line_seg,
        datasets: [
            {
                label: 'Fogão 01',
                data: medidasFg1,
                tension: 0,
                borderColor: borderFg1,
                backgroundColor: backgroundFg1,
            },
            {
                label: '',
                data: [30, 30, 30, 30, 30, 30],
                tension: 0,
                borderColor: 'rgb(205,5,5)',
                backgroundColor: 'rgb(205,5,5, 0.1)',
                borderDash: [5, 5],
                pointRadius: 0,
                fill: 'end'
            },
            {
                label: '',
                data: [10, 10, 10, 10, 10, 10],
                tension: 0,
                borderColor: 'rgb(241,101,41)',
                backgroundColor: 'rgb(241,101,41, 0.2)',
                borderDash: [5, 5],
                pointRadius: 0,
                fill: 'end'
            },
            {
                label: '',
                data: [10, 10, 10, 10, 10, 10],
                tension: 0,
                backgroundColor: 'rgb(40,106,174, 0.2)',
                borderDash: [5, 5],
                pointRadius: 0,
                fill: 'start'
            }
        ]
    }
    
    const config_segundo_fg1 = {
        type: 'line',
        data: data_segundo_fg1,
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: 'gray',
                        font: {
                            size: 12,
                            family: 'Montserrat',
                            weight: 'bold',
                        },
                        filter: function (legendItem) {
                            return legendItem.text !== '';
                        }
                    },
                    onClick: null
                },
                title: {
                    display: true,
                    text: 'Ultimos segundos',
                    padding: 0.5,
                    color: '#000000',
                    font: {
                        size: 16,
                        family: 'Montserrat',
                    }
                }
            },
            elements: {
                point: {
                    radius: 5
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    min: 0,
                    max: 100
                }
            }
        }
    }
    
    const graficoSegundoFg1 = new Chart(grafico_segundo_fg1, config_segundo_fg1);
    setInterval(() => dadosTempoReal(idSensorFg1, graficoSegundoFg1, data_segundo_fg1), 1000)
}

function plotagemGraficoIndividualFg2(medidasFg2) {
    const grafico_segundo_fg2 = document.querySelector("#grafico_segundos_fg2")
    
    const labels_line_seg = ['0', '1s', '2s', '3s', '4s', '5s']

    const data_segundo_fg2 = {
        labels: labels_line_seg,
        datasets: [
            {
                label: 'Fogão 02',
                data: medidasFg2,
                tension: 0,
                borderColor: borderFg2,
                backgroundColor: backgroundFg2,
            },
            {
                label: '',
                data: [30, 30, 30, 30, 30, 30],
                tension: 0,
                borderColor: 'rgb(205,5,5)',
                backgroundColor: 'rgb(205,5,5, 0.1)',
                borderDash: [5, 5],
                pointRadius: 0,
                fill: 'end'
            },
            {
                label: '',
                data: [10, 10, 10, 10, 10, 10],
                tension: 0,
                borderColor: 'rgb(241,101,41)',
                backgroundColor: 'rgb(241,101,41, 0.2)',
                borderDash: [5, 5],
                pointRadius: 0,
                fill: 'end'
            },
            {
                label: '',
                data: [10, 10, 10, 10, 10, 10],
                tension: 0,
                backgroundColor: 'rgb(40,106,174, 0.2)',
                borderDash: [5, 5],
                pointRadius: 0,
                fill: 'start'
            }
        ]
    }
    
    const config_segundo_fg2 = {
        type: 'line',
        data: data_segundo_fg2,
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: 'gray',
                        font: {
                            size: 12,
                            family: 'Montserrat',
                            weight: 'bold',
                        },
                        filter: function (legendItem) {
                            return legendItem.text !== '';
                        }
                    },
                    onClick: null
                },
                title: {
                    display: true,
                    text: 'Ultimos segundos',
                    padding: 0.5,
                    color: '#000000',
                    font: {
                        size: 16,
                        family: 'Montserrat',
                    }
                }
            },
            elements: {
                point: {
                    radius: 5
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    min: 0,
                    max: 100
                }
            }
        }
    }
    
    const graficoSegundoFg2 = new Chart(grafico_segundo_fg2, config_segundo_fg2);
    setInterval(() => dadosTempoReal(idSensorFg2, graficoSegundoFg2, data_segundo_fg2), 1000)
}

function plotagemGraficoIndividualFn (medidasFn) {
    const grafico_segundo_fn = document.querySelector("#grafico_segundos_fn")
    
    const labels_line_seg = ['0', '1s', '2s', '3s', '4s', '5s']

    const data_segundo_fn = {
        labels: labels_line_seg,
        datasets: [
            {
                label: 'Forno',
                data: medidasFn,
                tension: 0,
                borderColor: borderFn,
                backgroundColor: backgroundFn,
            },
            {
                label: '',
                data: [30, 30, 30, 30, 30, 30],
                tension: 0,
                borderColor: 'rgb(205,5,5)',
                backgroundColor: 'rgb(205,5,5, 0.1)',
                borderDash: [5, 5],
                pointRadius: 0,
                fill: 'end'
            },
            {
                label: '',
                data: [10, 10, 10, 10, 10, 10],
                tension: 0,
                borderColor: 'rgb(241,101,41)',
                backgroundColor: 'rgb(241,101,41, 0.2)',
                borderDash: [5, 5],
                pointRadius: 0,
                fill: 'end'
            },
            {
                label: '',
                data: [10, 10, 10, 10, 10, 10],
                tension: 0,
                backgroundColor: 'rgb(40,106,174, 0.2)',
                borderDash: [5, 5],
                pointRadius: 0,
                fill: 'start'
            }
        ]
    }
    
    const config_segundo_fn = {
        type: 'line',
        data: data_segundo_fn,
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: 'gray',
                        font: {
                            size: 12,
                            family: 'Montserrat',
                            weight: 'bold',
                        },
                        filter: function (legendItem) {
                            return legendItem.text !== '';
                        }
                    },
                    onClick: null
                },
                title: {
                    display: true,
                    text: 'Ultimos segundos',
                    padding: 0.5,
                    color: '#000000',
                    font: {
                        size: 16,
                        family: 'Montserrat',
                    }
                }
            },
            elements: {
                point: {
                    radius: 5
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    min: 0,
                    max: 100
                }
            }
        }
    }
    
    const graficoSegundoFn = new Chart(grafico_segundo_fn, config_segundo_fn);
    setInterval(() => dadosTempoReal(idSensorFn, graficoSegundoFn, data_segundo_fn), 1000)
}

function dadosTempoReal(idSensor, chart, dados) {
    fetch(`/dash/dadosTempoReal/${idSensor}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(`JSON do dado em tempo real do sensor ${idSensor}: ` + json)
                dados.datasets[0].data.shift();
                dados.datasets[0].data.push(json[0].nivel_gas);

                chart.update();
            })
        } else {
            console.log(`Houve um erro ao carregar a ultima medida do sensor`)
            resposta.text().then(texto => {
                console.error(texto);
            })
        }
    }).catch(erro => {
        console.log(erro)
    })
}

function mediaSemana() {
    var idCozinha = sessionStorage.ID_COZINHA;
    var idEmpresa = sessionStorage.ID_EMPRESA;

    fetch(`/dash/mediaSemana/${idCozinha}/${idEmpresa}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(json)
                const mediaSemanaFg1 = []
                const mediaSemanaFg2 = []
                const mediaSemanaFn = []

                const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
                const hoje = new Date();
                const diaAtual = hoje.getDay();

                const labels_line_week = [];

                for(let i = 0; i < diasSemana.length; i++) {
                    labels_line_week.push(diasSemana[(diaAtual + i) % diasSemana.length])
                }

                console.log(labels_line_week)

                for (var i = json.length - 1; i >= 0; i--) {
                    if (json[i].idSensor == idSensorFg1) {
                        mediaSemanaFg1.push(json[i].mediaNivelGas)
                    } else if (json[i].idSensor == idSensorFg2) {
                        mediaSemanaFg2.push(json[i].mediaNivelGas)
                    } else if (json[i].idSensor == idSensorFn) {
                        mediaSemanaFn.push(json[i].mediaNivelGas)
                    }
                }

                plotagemSemanaFg1(mediaSemanaFg1, labels_line_week)
                plotagemSemanaFg2(mediaSemanaFg2, labels_line_week)
                plotagemSemanaFn(mediaSemanaFn, labels_line_week)
            })
        } else {
            console.log(`Houve um erro ao carregar a quantidade de alertas do dia`)
            resposta.text().then(texto => {
                console.error(texto);
            })
        }
    }).catch(erro => {
        console.log(erro)
    })
}

function plotagemSemanaFg1(mediaSemanaFg1, labels_line_week) {
    const grafico_semana_fg1 = document.querySelector("#grafico_semana_fg1")

    const data_semana_fg1 = {
        labels: labels_line_week,
        datasets: [{
            data: mediaSemanaFg1,
            fill: false,
            label: 'Taxa de vazão',
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)'
            ],
            borderWidth: 1
        }]
    };
    
    const config_semana_fg1 = {
        type: 'bar',
        data: data_semana_fg1,
        options: {
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Média da semana',
                    padding: 0.5,
                    color: '#000000',
                    font: {
                        size: 12,
                        family: 'Montserrat',
                    }
                }
            },
            elements: {
                point: {
                    radius: 5
                }
            }
        }
    };

    const graficoSemanaFg1 = new Chart(grafico_semana_fg1, config_semana_fg1);
}

function plotagemSemanaFg2(mediaSemanaFg2, labels_line_week) {
    const grafico_semana_fg2 = document.querySelector("#grafico_semana_fg2")

    const data_semana_fg2 = {
        labels: labels_line_week,
        datasets: [{
            data: mediaSemanaFg2,
            fill: false,
            label: 'Taxa de vazão',
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)'
            ],
            borderWidth: 1
        }]
    };
    
    const config_semana_fg2 = {
        type: 'bar',
        data: data_semana_fg2,
        options: {
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Média da semana',
                    padding: 0.5,
                    color: '#000000',
                    font: {
                        size: 12,
                        family: 'Montserrat',
                    }
                }
            },
            elements: {
                point: {
                    radius: 5
                }
            }
        }
    };

    const graficoSemanaFg2 = new Chart(grafico_semana_fg2, config_semana_fg2);
}

function plotagemSemanaFn(mediaSemanaFn, labels_line_week) {
    const grafico_semana_fn = document.querySelector("#grafico_semana_fn")

    const data_semana_fn = {
        labels: labels_line_week,
        datasets: [{
            data: mediaSemanaFn,
            fill: false,
            label: 'Taxa de vazão',
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)'
            ],
            borderWidth: 1
        }]
    };
    
    const config_semana_fn = {
        type: 'bar',
        data: data_semana_fn,
        options: {
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Média da semana',
                    padding: 0.5,
                    color: '#000000',
                    font: {
                        size: 12,
                        family: 'Montserrat',
                    }
                }
            },
            elements: {
                point: {
                    radius: 5
                }
            }
        }
    };

    const graficoSemanaFn = new Chart(grafico_semana_fn, config_semana_fn);
}

atualizarDataHora();
setInterval(atualizarDataHora, 1000);
const grafico_hora = document.querySelector("#grafico_hora")
const grafico_minuto = document.querySelector("#grafico_minuto")
const grafico_comparacao = document.querySelector("#grafico_comparacao")

const labels_line_hora = ['07h', '08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h']
const labels_line_min = ['0', '1min', '2min', '3min', '4min', '5min']

// Configurando o CHART para o grafico_hora
var data_hora = {
    labels: labels_line_hora,
    datasets: [
        {
            label: 'Fogão 01',
            data: [18.3, 19.2, 18.7, 19, 19.5, 19.8, 19.4, 20, 20.6],
            tension: 0,
            borderColor: 'rgb(160, 71, 71)', // Cor da linha
            backgroundColor: 'rgb(160, 71, 71)', // Cor de fundo da linha
        },
        {
            label: 'Fogão 02',
            data: [41.0,39.0,37.2,37.0,34.0,35.0,41.0,39.0,37.2],
            tension: 0,
            borderColor: 'rgb(184, 117, 137)',
            backgroundColor: 'rgb(184, 117, 137)',
        },
        {
            label: 'Forno',
            data: [5, 2, 1, 0, 3, 4, 1, 1, 2],
            tension: 0,
            borderColor: 'rgb(240, 89, 65)',
            backgroundColor: 'rgb(240, 89, 65)',
        }
    ]
}

const config_hora = {
    type: 'line',
    data: data_hora,
    options: {
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Média por hora',
                padding: 0.5,
                color: '#000000',
                font: {
                    size: 14,
                    family: 'Montserrat',
                }
            }
        },
        elements: {
            point: {
                radius: 3 // Tamanho das bolinhas
            }
        }
    }
}

// Configurando o CHART para o grafico_minuto
const data_minuto = {
    labels: labels_line_min,
    datasets: [
        {
            label: 'Fogão 01',
            data: [12, 12.5, 14, 15, 16, 17],
            tension: 0,
            borderColor: 'rgb(160, 71, 71)',
            backgroundColor: 'rgb(160, 71, 71)',
        },
        {
            label: 'Fogão 02',
            data: [41, 39, 37.2, 37, 34, 35],
            tension: 0,
            borderColor: 'rgb(184, 117, 137)',
            backgroundColor: 'rgb(184, 117, 137)',
        },
        {
            label: 'Forno',
            data: [2.2, 2.8, 3.1, 3.5, 3.3, 3.8],
            tension: 0,
            borderColor: 'rgb(240, 89, 65)',
            backgroundColor: 'rgb(240, 89, 65)',
        },
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
                        size: 16,
                        family: 'Montserrat',
                        weight: 'bold',
                    },
                },
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
                radius: 5 // Tamanho das bolinhas
            }
        }
    }
}

// Configurando o CHART para o grafico_comparacao
const data_comparacao = {
    labels: [
        'Alertas',
        'Ok',
    ],
    datasets: [{
        label: 'Qtd. de Medições',
        data: [40, 60],
        backgroundColor: [
            '#cb0000',
            'green',
        ],
        hoverOffset: 4
    }]
}

const config_comparacao = {
    type: 'doughnut',
    data: data_comparacao,
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Medições de Gás do Dia (Geral)',
                padding: 0.5,
                color: '#000000',
                font: {
                    size: 14,
                    family: 'Montserrat',
                }
            }
        }
    }
}

// Inicializando os gráficos com as novas configurações
const graficoHora = new Chart(grafico_hora, config_hora);
const graficoMinuto = new Chart(grafico_minuto, config_minuto);
const graficoComparacao = new Chart(grafico_comparacao, config_comparacao);

// Mostrando Data e hora em tempo real
function atualizarDataHora() {
    let data_geral = new Date();

    // Formatar data como XX/XX/XXXX
    let dataFormatada = data_geral.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    // Formatar hora como HH:MM:SS
    let horaFormatada = data_geral.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    let dataHoraFormatada = `${dataFormatada} ${horaFormatada}`;

    const mostrar_data = document.querySelector('#data_hora');
    mostrar_data.textContent = dataHoraFormatada;
}

// Atualiza a data e hora inicialmente
atualizarDataHora();

// Atualiza a data e hora a cada segundo
setInterval(atualizarDataHora, 1000);
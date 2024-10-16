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
            data: [0, 12, 20, 30, 23, 40, 30, 35, 48],
            tension: 0,
            borderColor: 'rgb(210, 105, 30)',
            backgroundColor: 'rgb(210, 105, 30)',
        },
        {
            label: 'Fogão 02',
            data: [0, 2, 1, 3, 0, 2, 1, 4, 3],
            tension: 0,
            borderColor: 'rgb(64, 150, 196)',
            backgroundColor: 'rgb(64, 150, 196)',
        },
        {
            label: 'Forno',
            data: [0, 4, 0, 3, 4, 6, 17, 15, 12],
            tension: 0,
            borderColor: 'rgb(196, 64, 137)',
            backgroundColor: 'rgb(196, 64, 137)',
        }
    ]
}

const config_hora = {
    type: 'line',
    data: data_hora,
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
                text: 'Média dos Vazamentos de Gás a cada Hora',
                padding: 0.5,
                color: '#000000',
                font: {
                    size: 16,
                    family: 'Montserrat',
                }
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
            data: [0, 12, 20, 30, 23, 40, 30, 35, 48],
            tension: 0,
            borderColor: 'rgb(210, 105, 30)',
            backgroundColor: 'rgb(210, 105, 30)',
        },
        {
            label: 'Fogão 02',
            data: [0, 2, 1, 3, 0, 2, 1, 4, 3],
            tension: 0,
            borderColor: 'rgb(64, 150, 196)',
            backgroundColor: 'rgb(64, 150, 196)',
        },
        {
            label: 'Forno',
            data: [0, 4, 0, 3, 4, 6, 17, 15, 12],
            tension: 0,
            borderColor: 'rgb(196, 64, 137)',
            backgroundColor: 'rgb(196, 64, 137)',
        },
    ]
}

const config_minuto = {
    type: 'line',
    data: data_minuto,
    options: {
        plugins: {
            legend: {
                display: false // Remove a legenda
            },
            title: {
                display: true,
                text: 'Média dos últimos 5 Minutos',
                padding: 0.5,
                color: '#000000',
                font: {
                    size: 12,
                    family: 'Montserrat',
                }
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

const graficoHora = new Chart(
    grafico_hora,
    config_hora,
)

const graficoMinuto = new Chart(
    grafico_minuto,
    config_minuto,
)

const graficoComparacao = new Chart(
    grafico_comparacao,
    config_comparacao,
)


// Mostrando Data e hora em tempo real
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

const mostrar_data = document.getElementById("data_hora")
mostrar_data.innerHTML = dataHoraFormatada
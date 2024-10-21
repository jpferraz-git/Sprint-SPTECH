const grafico_hora = document.querySelector("#grafico_hora");
const grafico_minuto = document.querySelector("#grafico_minuto");
const grafico_comparacao = document.querySelector("#grafico_comparacao");

const labels_line_hora = ['07h', '08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h'];
const labels_line_min = ['0', '1min', '2min', '3min', '4min', '5min'];

// Função para determinar a cor de acordo com o valor do dado
function getColorBasedOnValue(value, isConsecutiveFive = false) {
    if (isConsecutiveFive) {
        return 'gold'; // Amarelo se cinco valores consecutivos são >= 5
    } else if (value >= 50) {
        return 'red'; // Acima de 50, cor vermelha
    } else if (value >= 25) {
        return 'orange'; // Entre 25 e 50, cor laranja
    } else if (value >= 10) {
        return 'gold'; // Entre 10 e 25, cor amarela
    } else {
        return 'blue'; // Abaixo de 10, cor azul
    }
}

// Função para verificar cinco valores consecutivos
function checkConsecutiveValues(data) {
    let consecutiveCount = 0;

    for (let i = 0; i < data.length; i++) {
        if (data[i] >= 5) {
            consecutiveCount++;
            if (consecutiveCount >= 5) {
                return true; // Encontrou cinco valores consecutivos >= 5
            }
        } else {
            consecutiveCount = 0; // Reseta o contador se o valor não for >= 5
        }
    }
    return false; // Não encontrou cinco valores consecutivos
}

// Configurando o CHART para o grafico_hora
const data_hora = {
    labels: labels_line_hora,
    datasets: [
        {
            label: 'Fogão 01',
            data: [18.3, 19.2, 18.7, 19, 19.5, 19.8, 19.4, 20, 20.6],
            tension: 0.4,
            borderColor: function (context) {
                const value = context.raw;
                const consecutive = checkConsecutiveValues(data_hora.datasets[0].data); // Verifica para a primeira dataset
                return getColorBasedOnValue(value, consecutive);
            },
            segment: {
                borderColor: (ctx) => {
                    const consecutive = checkConsecutiveValues(data_hora.datasets[0].data);
                    return getColorBasedOnValue(ctx.p1.raw, consecutive);
                }
            },
            pointBackgroundColor: function (context) {
                const value = context.raw;
                const consecutive = checkConsecutiveValues(data_hora.datasets[0].data);
                return getColorBasedOnValue(value, consecutive);
            },
            borderWidth: 3,
            backgroundColor: 'transparent',
        },
        {
            label: 'Fogão 02',
            data: [2, 3, 1, 5, 2, 4, 3, 1, 0.5],
            tension: 0.4,
            borderColor: function (context) {
                const value = context.raw;
                const consecutive = checkConsecutiveValues(data_hora.datasets[1].data); // Verifica para a segunda dataset
                return getColorBasedOnValue(value, consecutive);
            },
            segment: {
                borderColor: (ctx) => {
                    const consecutive = checkConsecutiveValues(data_hora.datasets[1].data);
                    return getColorBasedOnValue(ctx.p1.raw, consecutive);
                }
            },
            pointBackgroundColor: function (context) {
                const value = context.raw;
                const consecutive = checkConsecutiveValues(data_hora.datasets[1].data);
                return getColorBasedOnValue(value, consecutive);
            },
            borderWidth: 3,
            backgroundColor: 'transparent',
        },
        {
            label: 'Forno',
            data: [5, 2, 1, 0, 3, 4, 1, 1, 2],
            tension: 0.4,
            borderColor: function (context) {
                const value = context.raw;
                const consecutive = checkConsecutiveValues(data_hora.datasets[2].data); // Verifica para a terceira dataset
                return getColorBasedOnValue(value, consecutive);
            },
            segment: {
                borderColor: (ctx) => {
                    const consecutive = checkConsecutiveValues(data_hora.datasets[2].data);
                    return getColorBasedOnValue(ctx.p1.raw, consecutive);
                }
            },
            pointBackgroundColor: function (context) {
                const value = context.raw;
                const consecutive = checkConsecutiveValues(data_hora.datasets[2].data);
                return getColorBasedOnValue(value, consecutive);
            },
            borderWidth: 3,
            backgroundColor: 'transparent',
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
        },
        scales: {
            y: {
                beginAtZero: true, // Mantém o eixo Y iniciando no zero
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
            data: [17, 18, 19, 20, 21, 22],
            tension: 0.4,
            borderColor: function (context) {
                const value = context.raw;
                const consecutive = checkConsecutiveValues(data_minuto.datasets[0].data); // Verifica para a primeira dataset
                return getColorBasedOnValue(value, consecutive);
            },
            segment: {
                borderColor: (ctx) => {
                    const consecutive = checkConsecutiveValues(data_minuto.datasets[0].data);
                    return getColorBasedOnValue(ctx.p1.raw, consecutive);
                }
            },
            pointBackgroundColor: function (context) {
                const value = context.raw;
                const consecutive = checkConsecutiveValues(data_minuto.datasets[0].data);
                return getColorBasedOnValue(value, consecutive);
            },
            borderWidth: 3,
            backgroundColor: 'transparent',
        },
        {
            label: 'Fogão 02',
            data: [3, 3.5, 4, 4.5, 5, 4.2],
            tension: 0.4,
            borderColor: function (context) {
                const value = context.raw;
                const consecutive = checkConsecutiveValues(data_minuto.datasets[1].data); // Verifica para a segunda dataset
                return getColorBasedOnValue(value, consecutive);
            },
            segment: {
                borderColor: (ctx) => {
                    const consecutive = checkConsecutiveValues(data_minuto.datasets[1].data);
                    return getColorBasedOnValue(ctx.p1.raw, consecutive);
                }
            },
            pointBackgroundColor: function (context) {
                const value = context.raw;
                const consecutive = checkConsecutiveValues(data_minuto.datasets[1].data);
                return getColorBasedOnValue(value, consecutive);
            },
            borderWidth: 3,
            backgroundColor: 'transparent',
        },
        {
            label: 'Forno',
            data: [3.8, 4.2, 4.5, 4.8, 5.2, 5.5],
            tension: 0.4,
            borderColor: function (context) {
                const value = context.raw;
                const consecutive = checkConsecutiveValues(data_minuto.datasets[2].data); // Verifica para a terceira dataset
                return getColorBasedOnValue(value, consecutive);
            },
            segment: {
                borderColor: (ctx) => {
                    const consecutive = checkConsecutiveValues(data_minuto.datasets[2].data);
                    return getColorBasedOnValue(ctx.p1.raw, consecutive);
                }
            },
            pointBackgroundColor: function (context) {
                const value = context.raw;
                const consecutive = checkConsecutiveValues(data_minuto.datasets[2].data);
                return getColorBasedOnValue(value, consecutive);
            },
            borderWidth: 3,
            backgroundColor: 'transparent',
        }
    ]
}

const config_minuto = {
    type: 'line',
    data: data_minuto,
    options: {
        plugins: {
            legend: {
                display: false // Mantém a legenda desativada como no exemplo anterior
            },
            title: {
                display: true,
                text: 'Média dos Vazamentos de Gás a cada Minuto',
                padding: 0.5,
                color: '#000000',
                font: {
                    size: 16,
                    family: 'Montserrat',
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true, // Mantém o eixo Y iniciando no zero
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

const chart_hora = new Chart(grafico_hora, config_hora);
const chart_minuto = new Chart(grafico_minuto, config_minuto);
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

    // Corrigido: usar crases para interpolação de string
    let dataHoraFormatada = `${dataFormatada} ${horaFormatada}`;

    const mostrar_data = document.querySelector('#data_hora');
    mostrar_data.textContent = dataHoraFormatada;
}

// Atualiza a data e hora inicialmente
atualizarDataHora();

// Atualiza a data e hora a cada segundo
setInterval(atualizarDataHora, 1000);
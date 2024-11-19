function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

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
        buttonFg2.onclick = function () { trocarDash('fg2') };
        buttonFn.onclick = function () { trocarDash('fn') };
    } else if (tela == 'fg2') {
        dashGeral.style.display = 'none';
        dashFg1.style.display = 'none';
        dashFg2.style.display = 'flex';
        dashFn.style.display = 'none';

        containerFg1.style.border = 'none';
        containerFg2.style.border = '2px solid #EFB661';
        containerFn.style.border = 'none';

        buttonFg1.onclick = function () { trocarDash('fg1') }
        buttonFg2.onclick = function () { trocarDash('geral') }
        buttonFn.onclick = function () { trocarDash('fn') }
    } else if (tela == 'fn') {
        dashGeral.style.display = 'none';
        dashFg1.style.display = 'none';
        dashFg2.style.display = 'none';
        dashFn.style.display = 'flex';

        containerFg1.style.border = 'none';
        containerFg2.style.border = 'none';
        containerFn.style.border = '2px solid #EFB661';

        buttonFg1.onclick = function () { trocarDash('fg1') }
        buttonFg2.onclick = function () { trocarDash('fg2') }
        buttonFn.onclick = function () { trocarDash('geral') }
    } else if (tela == 'geral') {
        dashGeral.style.display = 'flex';
        dashFg1.style.display = 'none';
        dashFg2.style.display = 'none';
        dashFn.style.display = 'none';

        containerFg1.style.border = 'none';
        containerFg2.style.border = 'none';
        containerFn.style.border = 'none';

        buttonFg1.onclick = function () { trocarDash('fg1') }
        buttonFg2.onclick = function () { trocarDash('fg2') }
        buttonFn.onclick = function () { trocarDash('fn') }
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

atualizarDataHora();
setInterval(atualizarDataHora, 1000);

const grafico_minuto = document.querySelector("#grafico_minutos")
const grafico_segundo_fg1 = document.querySelector("#grafico_segundos_fg1")
const grafico_segundo_fg2 = document.querySelector("#grafico_segundos_fg2")
const grafico_segundo_fn = document.querySelector("#grafico_segundos_fn")
const grafico_semana_fg1 = document.querySelector("#grafico_semana_fg1")
const grafico_semana_fg2 = document.querySelector("#grafico_semana_fg2")
const grafico_semana_fn = document.querySelector("#grafico_semana_fn")

const labels_line_seg = ['0', '1s', '2s', '3s', '4s', '5s']
const labels_line_min = ['0', '1min', '2min', '3min', '4min', '5min']
const labels_line_week = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

const data_minuto = {
    labels: labels_line_min,
    datasets: [
        {
            label: 'Fogão 01',
            data: [19, 19.5, 19.8, 19.4, 20, 20.6],
            tension: 0,
            borderColor: 'rgb(241,101,41)',
            backgroundColor: 'rgb(241,101,41)',
        },
        {
            label: 'Fogão 02',
            data: [48, 52, 53, 58, 60, 55],
            tension: 0,
            borderColor: 'rgb(205,5,5)',
            backgroundColor: 'rgb(205,5,5)',
        },
        {
            label: 'Forno',
            data: [2.2, 2.8, 3.1, 3.5, 3.3, 3.8],
            tension: 0,
            borderColor: 'rgb(40,106,174)',
            backgroundColor: 'rgb(40,106,174)',
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

const data_segundo_fg1 = {
    labels: labels_line_seg,
    datasets: [
        {
            label: 'Fogão 01',
            data: [19, 19.5, 19.8, 19.4, 20, 20.6],
            tension: 0,
            borderColor: 'rgb(241,101,41)',
            backgroundColor: 'rgb(241,101,41)',
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

const data_segundo_fg2 = {
    labels: labels_line_seg,
    datasets: [
        {
            label: 'Fogão 02',
            data: [48, 52, 53, 58, 60, 55],
            tension: 0,
            borderColor: 'rgb(205,5,5)',
            backgroundColor: 'rgb(205,5,5)',
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

const data_segundo_fn = {
    labels: labels_line_seg,
    datasets: [
        {
            label: 'Forno',
            data: [2.2, 2.8, 3.1, 3.5, 3.3, 3.8],
            tension: 0,
            borderColor: 'rgb(40,106,174)',
            backgroundColor: 'rgb(40,106,174)',
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

const data_semana_fg1 = {
    labels: labels_line_week,
    datasets: [{
        data: [65, 59, 80, 81, 56, 55, 40],
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

const data_semana_fg2 = {
    labels: labels_line_week,
    datasets: [{
        data: [65, 59, 80, 81, 56, 55, 40],
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

const data_semana_fn = {
    labels: labels_line_week,
    datasets: [{
        data: [65, 59, 80, 81, 56, 55, 40],
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

const graficoMinuto = new Chart(grafico_minuto, config_minuto);
const graficoSegundoFg1 = new Chart(grafico_segundo_fg1, config_segundo_fg1);
const graficoSegundoFg2 = new Chart(grafico_segundo_fg2, config_segundo_fg2);
const graficoSegundoFn = new Chart(grafico_segundo_fn, config_segundo_fn);
const graficoSemanaFg1 = new Chart(grafico_semana_fg1, config_semana_fg1);
const graficoSemanaFg2 = new Chart(grafico_semana_fg2, config_semana_fg2);
const graficoSemanaFn = new Chart(grafico_semana_fn, config_semana_fn);
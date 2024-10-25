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

atualizarDataHora();
setInterval(atualizarDataHora, 1000);

const grafico_hora = document.querySelector("#grafico_hora")
const grafico_minuto = document.querySelector("#grafico_minutos")

const labels_line_hora = ['07h', '08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h']
const labels_line_min = ['0', '1min', '2min', '3min', '4min', '5min']

var data_hora = {
    labels: labels_line_hora,
    datasets: [
        {
            label: 'Fogão 01',
            data: [18.3, 19.2, 18.7, 19, 19.5, 19.8, 19.4, 20, 20.6],
            tension: 0,
            borderColor: 'rgb(160, 71, 71)',
            backgroundColor: 'rgb(160, 71, 71)',
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
            responsive: true,
            maintainAspectRatio: false,
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
                radius: 3
            }
        }
    }
}

const data_minuto = {
    labels: labels_line_min,
    datasets: [
        {
            label: 'Fogão 01',
            data: [2.3, 2.5, 3.4, 1.9, 2.4, 2.3],
            tension: 0,
            borderColor: 'rgb(240, 89, 65)',
            backgroundColor: 'rgb(240, 89, 65)',
        },
        {
            label: 'Fogão 02',
            data: [48, 52, 53, 58, 60, 55],
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
        {
            label: 'PERIGO',
            data: [30,30,30,30,30,30],
            tension: 0,
            borderColor: 'rgb(203,5,5)',
            backgroundColor: 'rgb(203,5,5)',
        },
        {
            label: 'ALERTA',
            data: [10,10,10,10,10,10],
            tension: 0,
            borderColor: 'rgb(255, 255, 255)',
            backgroundColor: 'rgb(241, 101, 41) ',
        },
    ]
}

const config_minuto = {
    type: 'line',
    data: data_minuto,
    options: {
        responsive: true,
        maintainAspectRatio: false,
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
                radius: 5
            }
        }
    }
}

const graficoHora = new Chart(grafico_hora, config_hora);
const graficoMinuto = new Chart(grafico_minuto, config_minuto);
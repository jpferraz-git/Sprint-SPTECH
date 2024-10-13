const grafico = document.querySelector("#grafico_geral")

const labels_line = ['07h', '08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h']

var data_fg01 = []
var data_fg02 = []
var data_fn = []

function gerarValorSensor(vetor_sensor,id_medida){
    medida = document.getElementById(id_medida)
    for(var i = 0; i <= 8; i++){
        var valor_sensor = parseInt(Math.random()*101)
        vetor_sensor[i] = valor_sensor
    }
    medida.innerHTML = `${vetor_sensor[(vetor_sensor.length-1)]}%`
}

gerarValorSensor(data_fg01,'fg1')
gerarValorSensor(data_fg02,'fg2')
gerarValorSensor(data_fn,'fn')

const data = {
    labels: labels_line,
    datasets: [
        {
            label: 'Fogão 01',
            data: data_fg01,
            tension: 0,
            borderColor: 'rgb(210, 105, 30)',
            backgroundColor: 'rgb(210, 105, 30)',
        },
        {
            label: 'Fogão 02',
            data: data_fg02,
            tension: 0,
            borderColor: 'rgb(64, 150, 196)',
            backgroundColor: 'rgb(64, 150, 196)',
        },
        {
            label: 'Forno',
            data: data_fn,
            tension: 0,
            borderColor: 'rgb(196, 64, 137)',
            backgroundColor: 'rgb(196, 64, 137)',
        },
    ]
}

const config = {
    type: 'line',
    data: data
}

const graficoGeral = new Chart(
    grafico,
    config,
)
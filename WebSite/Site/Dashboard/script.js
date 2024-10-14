// Declarando Funções
function gerarValorSensor(vetor_sensor, id_medida) {
    const medida = document.getElementById(id_medida)
    for (var i = 0; i <= 8; i++) {
        var valor_sensor = parseInt(Math.random() * 61)
        vetor_sensor[i] = valor_sensor
    }
    medida.innerHTML = `${vetor_sensor[(vetor_sensor.length - 1)]}%`
}

function somarVetor(variavel_vetor, variavel_soma) {
    for (var i = 0; i <= variavel_vetor.length - 1; i++) {
        variavel_soma += variavel_vetor[i]
    }
}

const grafico = document.querySelector("#grafico_geral")

const labels_line = ['07h', '08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h']

var data_fg01 = []
var data_fg02 = []
var data_fn = []

var soma_data_fg01 = 0
var soma_data_fg02 = 0
var soma_data_fn = 0

gerarValorSensor(data_fg01, 'fg1')
gerarValorSensor(data_fg02, 'fg2')
gerarValorSensor(data_fn, 'fn')

for (var i = 0; i <= data_fg01.length - 1; i++) {
    soma_data_fg01 += data_fg01[i]
}

for (var i = 0; i <= data_fg02.length - 1; i++) {
    soma_data_fg02 += data_fg02[i]
}

for (var i = 0; i <= data_fn.length - 1; i++) {
    soma_data_fn += data_fn[i]
}

console.log(soma_data_fg01, soma_data_fg02, soma_data_fn)

const avg_fg01 = soma_data_fg01 / data_fg01.length - 1
const avg_fg02 = soma_data_fg02 / data_fg02.length - 1
const avg_fn = soma_data_fn / data_fn.length - 1

console.log(avg_fg01, avg_fg02, avg_fn)

const medias = [avg_fg01, avg_fg02, avg_fn]

const qtd_sensores = 3
var vazamento = 0

for (var medida_atual = 0; medida_atual < medias.length; medida_atual++) {
    if (medias[medida_atual] > 32) {
        vazamento++
    }
}

var situacao_ok = qtd_sensores - vazamento

const mostrar_qtd_sensores = document.getElementById('sensor_ativo')
mostrar_qtd_sensores.innerHTML = qtd_sensores

const mostrar_sensor_ok = document.getElementById('sensor_ok')
mostrar_sensor_ok.innerHTML = situacao_ok

const mostrar_sensor_vazamento = document.getElementById('sensor_vazamento')
mostrar_sensor_vazamento.innerHTML = vazamento

// Configurando o CHART
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
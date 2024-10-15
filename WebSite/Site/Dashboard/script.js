
const grafico = document.querySelector("#grafico_geral")

const labels_line = ['07h', '08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h']

// Configurando o CHART
const data = {
    labels: labels_line,
    datasets: [
        {
            label: 'Fogão 01',
            data: [0,12,20,30,23,40,30,35,48],
            tension: 0,
            borderColor: 'rgb(210, 105, 30)',
            backgroundColor: 'rgb(210, 105, 30)',
        },
        {
            label: 'Fogão 02',
            data: [0,2,1,3,0,2,1,4,3],
            tension: 0,
            borderColor: 'rgb(64, 150, 196)',
            backgroundColor: 'rgb(64, 150, 196)',
        },
        {
            label: 'Forno',
            data: [0,4,0,3,4,6,17,15,12],
            tension: 0,
            borderColor: 'rgb(196, 64, 137)',
            backgroundColor: 'rgb(196, 64, 137)',
        },
    ]
}

const config = {
    type: 'line',
    data: data,
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Média dos Sensores a Cada Hora',
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
const int PINO_SENSOR_MQ2 = A0; 
const int VALOR_MINIMO = 100; 
const int VALOR_MAXIMO = 1000; 
// PINO_SENSOR_MQ2 define o pino analógico do Arduino onde o sensor MQ2 está conectado (A0) 
// VALOR_MINIMO e VALOR_MAXIMO definem o intervalo de valores esperados do sensor.
// Esses valores são usados para mapear a leitura do sensor para uma faixa de porcentagem (0% a 100%). 

// Configuração Inicial: 
void setup(){ 
  Serial.begin(9600); 
} 
//Serial.begin(9600); 
// Inicializa a comunicação serial a 9600 bauds para enviar dados ao monitor serial. 


//Loop Principal: 
void loop(){ 
  int valorSensor = analogRead(PINO_SENSOR_MQ2); 
// int valorSensor = analogRead(PINO_SENSOR_MQ2);  
// Lê o valor analógico do sensor MQ2. Este valor está na faixa de 0 a 1023. 


float porcentagem = ((float)(valorSensor - VALOR_MINIMO) / (VALOR_MAXIMO - VALOR_MINIMO)) * 100; 
// float porcentagem = ((float)(valorSensor - VALOR_MINIMO) / (VALOR_MAXIMO - VALOR_MINIMO)) * 100; 
// Converte o valor lido do sensor para uma porcentagem baseada no intervalo definido. 
// A fórmula faz o mapeamento linear do valor do sensor para uma faixa de 0 a 100%. 
// valorSensor - VALOR_MINIMO: Subtrai o valor mínimo para ajustar a base do cálculo. 
// (VALOR_MAXIMO - VALOR_MINIMO): Calcula o intervalo total de valores. 
// ((float) ... / ...) * 100: Converte a faixa ajustada em uma porcentagem. 

 
if (porcentagem < 0){ 
    porcentagem = 0; 
  } else if(porcentagem > 100){ 
    porcentagem = 100; 
  } 
// if (porcentagem < 0) { porcentagem = 0; } else if (porcentagem > 100) { porcentagem = 100; }  
// Garante que a porcentagem não exceda os limites de 0% e 100%. 
// Isso é útil para lidar com valores fora do intervalo esperado, garantindo que o resultado esteja dentro da faixa desejada. 

  Serial.print("Valor de Saida do Sensor: "); 
  Serial.print(valorSensor); 
  Serial.print(" -> Porcentagem: "); 
  Serial.print(porcentagem); 
  Serial.println("%"); 
// Serial.print("Valor de Saida do Sensor: "); ... Serial.println("%"); 
// Imprime o valor lido do sensor e a porcentagem correspondente no monitor serial. 

delay(1000); 
} 
// delay(1000); 
//Aguarda 1000 milissegundos (1 segundo) antes de realizar a próxima leitura do sensor. 

// Resumo 
// O código acima lê o valor do sensor MQ2, mapeia esse valor para uma faixa de porcentagem entre 0% e 100%
// exibe essas informações no monitor serial. O mapeamento é baseado em um intervalo predefinido de valores (VALOR_MINIMO e VALOR_MAXIMO).
// A porcentagem permite uma visualização mais intuitiva da variação nos valores do sensor em relação ao intervalo especificado. 
const int PINO_SENSOR_MQ2 = A4; 
const int VALOR_MINIMO = 100; 
const int VALOR_MAXIMO = 1000; 

// Configuração Inicial: 
void setup(){ 
  Serial.begin(9600); 
} 

//Loop Principal: 
void loop(){ 
  int valorSensor = analogRead(PINO_SENSOR_MQ2); 


  float porcentagem = ((float)(valorSensor - VALOR_MINIMO) / (VALOR_MAXIMO - VALOR_MINIMO)) * 100; 
 
  if (porcentagem < 0){ 
    porcentagem = 0; 
    } else if(porcentagem > 100){ 
    porcentagem = 100; 
    } 

  Serial.println(porcentagem); 


delay(1000); 
} 

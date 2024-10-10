CREATE DATABASE gasbusters;
USE gasbusters;

CREATE TABLE empresa(
idEmpresa  		INT PRIMARY KEY AUTO_INCREMENT,
razaoSocial  	VARCHAR(100) NOT NULL,
nomeFantasia 	VARCHAR(100),
CNPJ  			CHAR(14) NOT NULL,
cidade  		VARCHAR(45) NOT NULL,
bairro 			VARCHAR(45) NOT NULL,
Uf 				CHAR(2) NOT NULL,
rua 			VARCHAR(45) NOT NULL,
numero 			VARCHAR(6) NOT NULL,
cep 			CHAR(9) NOT NULL,
telefoneEmpresa CHAR(10),
emailEmpresa 	VARCHAR(100) NOT NULL,
dtCriacao 		TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usuario(
idUsuario		INT NOT NULL,
nome  			VARCHAR(45) NOT NULL,
telefonePessoa  CHAR(11) NOT NULL,
cpf  			CHAR(11) NOT NULL,
dtNasc  		DATE NOT NULL,
emailPessoal  	VARCHAR(100) NOT NULL,
senha  			VARCHAR(45) NOT NULL,
dtCriacao  		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
fkEmpresa  		INT NOT NULL,
fkUsuarioADM  	INT NOT NULL,
PRIMARY KEY (idUsuario, fkUsuarioADM),
FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa),
FOREIGN KEY (fkUsuarioADM)REFERENCES usuario (idUsuario)
);

CREATE TABLE cozinha(
idCozinha		 	 INT NOT NULL,
tipoCozinha 		 VARCHAR(15) NOT NULL,
numeroFuncionarios 	 INT NOT NULL,
observacoes 		 TEXT,
entradasGas 		 INT NOT NULL,
fkEmpresa 			 INT NOT NULL,
PRIMARY KEY (idCozinha,fkEmpresa),
FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa),
CHECK (tipoCozinha IN ('Industrial', 'Comercial'))
);

CREATE TABLE sensor(
idSensor            INT NOT NULL,
nomeSensor          VARCHAR(45) NOT NULL,
localInstalacao     VARCHAR(255) NOT NULL,
sensorStatus        VARCHAR(20) NOT NULL,
dtInstalacao        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
fkCozinha           INT NOT NULL,
PRIMARY KEY (idSensor, fkCozinha),
FOREIGN KEY (fkCozinha) REFERENCES cozinha (idCozinha),
CHECK (sensorStatus IN ('Ativo', 'Inativo'))
);

CREATE TABLE  medida(
idMedida  			INT NOT NULL,
sensor_analogico 	FLOAT NOT NULL,
dtLeitura  			TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
fkSensor  			INT NOT NULL,
PRIMARY KEY (idMedida, fkSensor),
FOREIGN KEY (fkSensor) REFERENCES sensor (idSensor)
);


CREATE DATABASE gasbusters;
USE gasbusters;


CREATE TABLE empresa(
idEmpresa  		INT PRIMARY KEY AUTO_INCREMENT,
razaoSocial  	VARCHAR(100),
nomeFantasia 	VARCHAR(100),
responsavellegal varchar(45),
CNPJ  			CHAR(18),
cidade  		VARCHAR(45),
bairro 			VARCHAR(45),
uf 				CHAR(5),
rua 			VARCHAR(45),
numero 			VARCHAR(6),
cep 			CHAR(9),
telefoneEmpresa CHAR(14),
emailEmpresa 	VARCHAR(100),
dtCriacao 		TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE usuario(
idUsuario		INT AUTO_INCREMENT,
nome  			VARCHAR(45),
dtNasc  		DATE,
email			VARCHAR(100),
senha  			VARCHAR(45),
dtCriacao  		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
fkEmpresa  		INT,
PRIMARY KEY (idUsuario),
FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa)
);

CREATE TABLE tecnico (
idTecnico INT AUTO_INCREMENT,
nome VARCHAR(45),
cargo VARCHAR(45),
fkEmpresa	INT,
fkUsuario	INT,
PRIMARY KEY (idTecnico,fkEmpresa,fkUsuario),
FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)

);


CREATE TABLE cozinha(
idCozinha		 	 INT AUTO_INCREMENT,
tipoCozinha 		 VARCHAR(15),
observacoes 		 TEXT,
qtdSaidaGas	 		 INT,
fkEmpresa 			 INT,
PRIMARY KEY (idCozinha,fkEmpresa),
FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa),
CHECK (tipoCozinha IN ('Industrial', 'Comercial'))
);

CREATE TABLE localsensor(
idLocal INT AUTO_INCREMENT,
descricao TEXT,
fkCozinha INT,
fkEmpresa INT,
PRIMARY KEY (idLocal, fkCozinha, fkEmpresa),
FOREIGN KEY (fkCozinha) REFERENCES cozinha(idCozinha),
FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE sensor(
idSensor            INT PRIMARY KEY AUTO_INCREMENT,
nomeSensor          VARCHAR(45),
localInstalacao     VARCHAR(255),
sensorStatus        VARCHAR(20),
dtInstalacao        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
fkCozinha           INT,
fkEmpresa 			INT,
fkLocal				INT,
FOREIGN KEY (fkCozinha) REFERENCES cozinha (idCozinha),
FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa),
FOREIGN KEY (fkLocal) REFERENCES localsensor(idLocal),
CHECK (sensorStatus IN ('Ativo', 'Inativo'))
);

CREATE TABLE  medida(
idMedida  			INT AUTO_INCREMENT,
nivel_gas		 	FLOAT,
dtLeitura  			TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
fkSensor  			INT,
PRIMARY KEY (idMedida, fkSensor),
FOREIGN KEY (fkSensor) REFERENCES sensor (idSensor)
);


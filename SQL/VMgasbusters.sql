CREATE DATABASE gasbusters;
USE gasbusters;

CREATE TABLE empresas (
idEmpresa 		INT AUTO_INCREMENT PRIMARY KEY,
nomeEmpresa 	VARCHAR(100),
cnpj			VARCHAR(18),
cidade			Varchar(50),
bairro			VARCHAR(50),
uf				CHAR(2),
rua				VARCHAR(100),
numero 			VARCHAR(6),
cep				VARCHAR(9),
telefoneEmpresa VARCHAR(20),
emailEmpresa 	VARCHAR(100),
dtCriacao 		TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE usuarios (
idUsuario 		INT AUTO_INCREMENT PRIMARY KEY,
nome 			VARCHAR(100),
telefonePessoa 	VARCHAR(20),
cpf				VARCHAR(14),
dtNascimento 	DATE,
emailPessoal 	VARCHAR(100),
senha 			VARCHAR(30),
dtCriacao 		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
fkEmpresa 		INT,
FOREIGN KEY (fkEmpresa) REFERENCES empresas(idEmpresa)
);


CREATE TABLE cozinhas (
idCozinha 			INT AUTO_INCREMENT PRIMARY KEY,
tipoCozinha 		VARCHAR(15),
numeroFuncionarios	INT,
observacoes			TEXT,
entradaGas			INT, 
fkEmpresa			INT,
dtCriacao 			TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (fkEmpresa) REFERENCES empresas(idEmpresa),
CHECK (tipoCozinha IN ('Industrial', 'Comercial'))
);



CREATE TABLE sensores (
idSensor 		INT AUTO_INCREMENT PRIMARY KEY,
nomeSensor		VARCHAR(50),
localInstalacao VARCHAR(255),
sensorStatus 	VARCHAR(20),
dtInstalacao	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
fkEmpresa		INT,
fkCozinha		INT,
FOREIGN KEY (fkEmpresa) REFERENCES empresas(idEmpresa),
FOREIGN KEY (fkCozinha) REFERENCES cozinhas(idCozinha),
CHECK (sensorStatus IN ('Ativo', 'Inativo')) 
);


CREATE TABLE medida (
idMedida		 INT AUTO_INCREMENT PRIMARY KEY,
sensor_analogico FLOAT,
dtLeitura		 TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
fkSensor		 INT,
FOREIGN KEY (fkSensor) REFERENCES sensores(idSensor) 
);



CREATE DATABASE gasbusters;
USE gasbusters;

CREATE TABLE empresa(
idEmpresa  		INT PRIMARY KEY AUTO_INCREMENT,
razaoSocial  	VARCHAR(100),
nomeFantasia 	VARCHAR(100),
CNPJ  			CHAR(14),
cidade  		VARCHAR(45),
bairro 			VARCHAR(45),
Uf 				CHAR(2),
rua 			VARCHAR(45),
numero 			VARCHAR(6),
cep 			CHAR(9),
telefoneEmpresa CHAR(11),
emailEmpresa 	VARCHAR(100),
dtCriacao 		TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usuario(
idUsuario		INT AUTO_INCREMENT,
nome  			VARCHAR(45),
telefonePessoa  CHAR(11),
cpf  			CHAR(11),
dtNasc  		DATE,
emailPessoal  	VARCHAR(100),
senha  			VARCHAR(45),
dtCriacao  		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
fkEmpresa  		INT,
fkUsuarioADM  	INT,
PRIMARY KEY (idUsuario, fkUsuarioADM),
FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa),
FOREIGN KEY (fkUsuarioADM)REFERENCES usuario (idUsuario)
);

CREATE TABLE cozinha(
idCozinha		 	 INT AUTO_INCREMENT,
tipoCozinha 		 VARCHAR(15),
numeroFuncionarios 	 INT,
observacoes 		 TEXT,
entradasGas 		 INT,
fkEmpresa 			 INT,
PRIMARY KEY (idCozinha,fkEmpresa),
FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa),
CHECK (tipoCozinha IN ('Industrial', 'Comercial'))
);

CREATE TABLE sensor(
idSensor            INT AUTO_INCREMENT,
nomeSensor          VARCHAR(45),
localInstalacao     VARCHAR(255),
sensorStatus        VARCHAR(20),
dtInstalacao        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
fkCozinha           INT,
PRIMARY KEY (idSensor, fkCozinha),
FOREIGN KEY (fkCozinha) REFERENCES cozinha (idCozinha),
CHECK (sensorStatus IN ('Ativo', 'Inativo'))
);

CREATE TABLE  medida(
idMedida  			INT AUTO_INCREMENT,
sensor_analogico 	FLOAT,
dtLeitura  			TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
fkSensor  			INT,
PRIMARY KEY (idMedida, fkSensor),
FOREIGN KEY (fkSensor) REFERENCES sensor (idSensor)
);


INSERT INTO empresa (razaoSocial, nomeFantasia, CNPJ, cidade, bairro, Uf, rua, numero, cep, telefoneEmpresa, emailEmpresa) 
VALUES ('Empresa Gasbusters Ltda', 'Gasbusters', '12345678901234', 'São Paulo', 'Centro', 'SP', 'Rua Nova Vila', '100', '01000-000', '11987654321', 'contato@gasbusters.com.br');

INSERT INTO empresa (razaoSocial, nomeFantasia, CNPJ, cidade, bairro, Uf, rua, numero, cep, telefoneEmpresa, emailEmpresa) 
VALUES ('Empresa Três Irmãos S.A.', 'Três Irmãos', '23456789012345', 'Rio de Janeiro', 'Copacabana', 'RJ', 'Avenida Bem vindas', '200', '22070-000', '21987654321', 'contato@tresirmaos.com.br');


INSERT INTO usuario (idUsuario, nome, telefonePessoa, cpf, dtNasc, emailPessoal, senha, fkEmpresa, fkUsuarioADM) 
VALUES (1, 'João', '11987654321', '12345678901', '1980-01-01', 'joao.pedro@gasbusters.com.br', 'SSenha@@123', 1, 1);

INSERT INTO usuario (idUsuario, nome, telefonePessoa, cpf, dtNasc, emailPessoal, senha, fkEmpresa, fkUsuarioADM) 
VALUES (2, 'Lucas', '21987654321', '23456789012', '1990-02-02', 'lucas.aiello@tresirmaos.com.br', 'SSenha@@456', 2, 1);

INSERT INTO usuario (idUsuario, nome, telefonePessoa, cpf, dtNasc, emailPessoal, senha, fkEmpresa, fkUsuarioADM) 
VALUES (3, 'Miguel', '31987654321', '34567890123', '1985-03-03', 'miguel.angel@gasbusters.com.br', 'SSenha@@789', 1, 1);

INSERT INTO usuario (idUsuario, nome, telefonePessoa, cpf, dtNasc, emailPessoal, senha, fkEmpresa, fkUsuarioADM) 
VALUES (4, 'Shelly', '41987654321', '45678901234', '1995-04-04', 'shelly.nadudvari@tresirmaos.com.br', 'SSenha@@321', 2, 1);

INSERT INTO usuario (idUsuario, nome, telefonePessoa, cpf, dtNasc, emailPessoal, senha, fkEmpresa, fkUsuarioADM) 
VALUES (5, 'Thiago', '51987654321', '56789012345', '1988-05-05', 'thiago.sanchez@gasbusters.com.br', 'SSenha@@654', 1, 1);


INSERT INTO cozinha (idCozinha, tipoCozinha, numeroFuncionarios, observacoes, entradasGas, fkEmpresa) 
VALUES (1, 'Industrial', 10, 'Cozinha ampla e moderna', 2, 1);

INSERT INTO cozinha (idCozinha, tipoCozinha, numeroFuncionarios, observacoes, entradasGas, fkEmpresa) 
VALUES (2, 'Comercial', 5, 'Cozinha compacta e eficiente', 1, 2);

INSERT INTO sensor (idSensor, nomeSensor, localInstalacao, sensorStatus, fkCozinha) 
VALUES (1, 'Sensor 1', 'Cozinha Principal no fogão', 'Ativo', 1);

INSERT INTO sensor (idSensor, nomeSensor, localInstalacao, sensorStatus, fkCozinha) 
VALUES (2, 'Sensor 2', 'Cozinha Principal no fogão 2', 'Ativo', 2);
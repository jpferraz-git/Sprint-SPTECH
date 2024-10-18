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


INSERT INTO empresa (razaoSocial, nomeFantasia, CNPJ, cidade, bairro, Uf, rua, numero, cep, telefoneEmpresa, emailEmpresa) 
VALUES ('Empresa Gasbusters Ltda', 'Gasbusters, '12345678901234', 'São Paulo', 'Centro', 'SP', 'Rua Nova Vila', '100', '01000-000', '11987654321', 'contato@gasbusters.com.br');

INSERT INTO empresa (razaoSocial, nomeFantasia, CNPJ, cidade, bairro, Uf, rua, numero, cep, telefoneEmpresa, emailEmpresa) 
VALUES ('Empresa Três Irmãos S.A.', 'Três Irmãos, '23456789012345', 'Rio de Janeiro', 'Copacabana', 'RJ', 'Avenida Bem vindas', '200', '22070-000', '21987654321', 'contato@tresirmaos.com.br');


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
VALUES (2, 'Sensor 2', 'Cozinha Principal no fogão 2, 'Ativo', 2);
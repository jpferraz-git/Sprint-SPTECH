-- Active: 1732668707503@@127.0.0.1@3306@gasbusters
CREATE DATABASE gasbusters;
USE gasbusters;

CREATE TABLE empresa(
idEmpresa  		INT PRIMARY KEY AUTO_INCREMENT,
razaoSocial  	VARCHAR(100),
nomeFantasia 	VARCHAR(100),
CNPJ  			CHAR(14),
cidade  		VARCHAR(45),
bairro 			VARCHAR(45),
uf 				CHAR(5),
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
dtNasc  		DATE,
email			VARCHAR(100),
senha  			VARCHAR(45),
dtCriacao  		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
fkEmpresa  		INT,
PRIMARY KEY (idUsuario),
FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa)
);


CREATE TABLE cozinha(
idCozinha		 	 INT AUTO_INCREMENT,
tipoCozinha 		 VARCHAR(15),
numeroFuncionarios 	 INT,
observacoes 		 TEXT,
qtdSaidaGas	 		 INT,
fkEmpresa 			 INT,
PRIMARY KEY (idCozinha,fkEmpresa),
FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa),
CHECK (tipoCozinha IN ('Industrial', 'Comercial'))
);

CREATE TABLE localSensor(
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
FOREIGN KEY (fkLocal) REFERENCES localSensor (idLocal),
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

-- Inserindo dados na tabela empresa
INSERT INTO empresa (razaoSocial, nomeFantasia, CNPJ, cidade, bairro, uf, rua, numero, cep, telefoneEmpresa, emailEmpresa)
VALUES 
('Empresa X Ltda.', 'X Cozinha', '12345678000199', 'São Paulo', 'Centro', 'SP', 'Rua A', '100', '01001000', '11999999999', 'contato@xcozinha.com'),
('Empresa Y SA', 'Y Food', '98765432000188', 'Rio de Janeiro', 'Copacabana', 'RJ', 'Avenida B', '500', '22041001', '21988888888', 'suporte@yfood.com');

-- Inserindo dados na tabela usuario
INSERT INTO usuario (nome, dtNasc, email, senha, fkEmpresa)
VALUES
('João Silva', '1990-05-20', 'joao.silva@xcozinha.com', 'senha123', 1),
('Maria Oliveira', '1985-09-15', 'maria.oliveira@yfood.com', 'segura456', 2);

-- Inserindo dados na tabela cozinha
INSERT INTO cozinha (tipoCozinha, numeroFuncionarios, observacoes, qtdSaidaGas, fkEmpresa)
VALUES
('Industrial', 10, 'Cozinha ampla com boa ventilação', 3, 1),
('Comercial', 5, 'Espaço compacto e eficiente', 2, 2);

-- Inserindo dados na tabela localSensor
INSERT INTO localSensor (descricao, fkCozinha, fkEmpresa)
VALUES
('Área próxima ao fogão industrial', 1, 1),
('Próximo à saída de ar', 2, 2);

-- Inserindo dados na tabela sensor
INSERT INTO sensor (nomeSensor, localInstalacao, sensorStatus, fkCozinha, fkEmpresa, fkLocal)
VALUES
('Sensor 1', 'Fogão Principal', 'Ativo', 1, 1, 1),
('Sensor 2', 'Exaustor', 'Inativo', 2, 2, 2),
('Sensor 3', 'Área de armazenamento', 'Ativo', 1, 1, 1),
('Sensor 4', 'Entrada de gás', 'Ativo', 1, 1, 1),
('Sensor 5', 'Exaustor Secundário', 'Ativo', 2, 2, 2),
('Sensor 6', 'Cozinha Frontal', 'Ativo', 2, 2, 2),
('Sensor 7', 'Sistema de ventilação', 'Ativo', 1, 1, 1),
('Sensor 8', 'Corredor de serviço', 'Ativo', 2, 2, 2);

-- Inserindo dados na tabela medida
INSERT INTO medida (nivel_gas, fkSensor)
VALUES
(0.7, 1),
(1.2, 3),
(1.9, 4),
(0.5, 2),
(1.8, 5),
(3.8, 6);

SELECT * FROM cozinha;
SELECT * FROM empresa;
SELECT * FROM localsensor;
SELECT * FROM medida;
SELECT * FROM sensor;
SELECT * FROM usuario;

SELECT 
        SUM(CASE WHEN nivel_gas BETWEEN 0 AND 10 THEN 1 ELSE 0 END) AS qtdNormal,
        SUM(CASE WHEN nivel_gas BETWEEN 11 AND 20 THEN 1 ELSE 0 END) AS qtdAlerta,
        SUM(CASE WHEN nivel_gas > 20 THEN 1 ELSE 0 END) AS qtdPerigo
FROM medida JOIN sensor ON fkSensor = idSensor WHERE fkCozinha = 1 AND fkEmpresa = 1;

SELECT 
    s.idSensor,
    s.nomeSensor,
    m.nivel_gas,
    m.dtLeitura
FROM sensor s
JOIN medida m ON s.idSensor = m.fkSensor
JOIN (
    SELECT fkSensor, MAX(dtLeitura) AS ultimaLeitura
    FROM medida
    GROUP BY fkSensor
) ultimas ON m.fkSensor = ultimas.fkSensor AND m.dtLeitura = ultimas.ultimaLeitura
WHERE s.fkCozinha = 1 AND s.fkEmpresa = 1;


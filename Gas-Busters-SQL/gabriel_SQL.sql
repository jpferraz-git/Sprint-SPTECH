-- SENSOR
-- USUARIO
-- endereco

CREATE DATABASE GasBusters;

USE GasBusters;

CREATE TABLE MQ2_sensor(
	id INT PRIMARY KEY AUTO_INCREMENT,
    porcentagem_gas FLOAT,
    data_coleta DATETIME,
    nome_fantasia VARCHAR(60)
);

CREATE TABLE usuario(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome_responsavel VARCHAR(60),
    email CHAR(40),
    documento_identificacao CHAR(40),
    senha VARCHAR(30),
    telefone VARCHAR(18),
    data_cadastro DATE
);

CREATE TABLE endereco (
	id INT PRIMARY KEY AUTO_INCREMENT,
    rua VARCHAR(50),
    cidade VARCHAR(30),
    estado VARCHAR(30),
    numero INT,
	referencia VARCHAR(100)
);

CREATE TABLE empresa(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome_fantasia CHAR(50),
    usuario_id INT,
    endereco_id INT
);

-- current_timestamp()

INSERT INTO usuario (nome, email, senha, telefone, data_cadastro) VALUES 
('José', 'jose@teste.com', '123456', '94002-8922', '2022-02-02');

SELECT * FROM usuario;

INSERT INTO MQ2_sensor (porcentagem_gas, data_coleta) VALUES (
	22, current_timestamp()
);

SELECT * FROM MQ2_sensor;

DESC endereco;

INSERT INTO endereco (rua, cidade, estado, numero, referencia) VALUES (
	'rua dos testes', 'sao paulo', 'sao paulo', 3, 'ao lado do starbucks'
);

SELECT * FROM endereco;
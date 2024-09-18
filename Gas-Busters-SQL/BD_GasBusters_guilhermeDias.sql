CREATE DATABASE GasBusters; 

USE GasBusters ; 

CREATE TABLE dadosCliente (
idCliente INT PRIMARY KEY AUTO_INCREMENT, 
nome VARCHAR(50), 
email VARCHAR(60), 
telefone VARCHAR(15), 
nomeEmpresa VARCHAR(60), 
emailEmpresa VARCHAR(60), 
telefoneEmpresa VARCHAR(15) 
) ; 

CREATE TABLE dadosSensor (
porcentagem_sensor FLOAT 
); 

CREATE TABLE endereco (
idEndereço INT PRIMARY KEY AUTO_INCREMENT,
cep VARCHAR(10), 
rua VARCHAR(60), 
numero INT, 
complemento VARCHAR(15), 
referencia VARCHAR(30) 
) ;

CREATE TABLE contratacao (
idContratacao INT PRIMARY KEY AUTO_INCREMENT, 
tipoPlano VARCHAR(20), 
valor FLOAT, 
prazo_instalacao DATE 
) ; 

ALTER TABLE dadosCliente MODIFY COLUMN cpf VARCHAR (15); 
ALTER TABLE dadosCliente MODIFY COLUMN cnpj VARCHAR (20); 
ALTER TABLE endereco ADD COLUMN cidade VARCHAR(35); 
ALTER TABLE endereco ADD COLUMN estado VARCHAR(30); 

DESC dadosCliente ; 

INSERT INTO dadosCliente VALUES 
(default, 'Guilherme', 'bigode123@gmail.com', '11 1234-5467', 'Big Odes', 'Big@Odes.com', '11 01234-5678', '012.345;678-12', '01.234.567/0123-45');

SELECT * FROM dadosCliente ; 

INSERT INTO dadosSensor VALUES
(00.0001) ; 

SELECT * FROM dadosSensor ; 

INSERT INTO endereco VALUES 
(default, '01234-567', 'Rua Cafundó do Judas', 123,'Casa 0', 'Esquina do fim'); 

SELECT * FROM endereco ; 

INSERT INTO contratacao VALUES 
(default, 'Plano Top', '35000', '2024-09-12') ; 

SELECT * FROM contratacao ; 

INSERT INTO endereco(cidade, estado) VALUES 
('São Paulo', 'São Paulo'); 

SELECT * FROM endereco ; 
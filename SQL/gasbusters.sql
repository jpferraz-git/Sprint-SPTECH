-- Criação do banco de dados
CREATE DATABASE gasbusters;

-- Usar o banco
USE gasbusters;

-- Criação da tabela usuario/cadastro
CREATE TABLE cadastro(
id			INT PRIMARY KEY AUTO_INCREMENT, 
nome		VARCHAR(50) NOT NULL, 
email		VARCHAR(60) NOT NULL, 
telefone	VARCHAR(15) NOT NULL, 
senha		VARCHAR(20) NOT NULL,
cpf			VARCHAR(15) NOT NULL,
dtdata		DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela do Sensor de gás MQ2
CREATE TABLE sensor(
id					INT PRIMARY KEY AUTO_INCREMENT,
id_empresa			INT,
porcentagem			FLOAT,
data_coleta			DATETIME
);

-- Criação da tabela Cozinha endereço 
CREATE TABLE cozinhaEnd(
id		INT PRIMARY KEY AUTO_INCREMENT,
rua		VARCHAR(100),
bairro	VARCHAR(50),
estado	VARCHAR(30),
pais	VARCHAR(30),
cidade	VARCHAR(50),
numero	VARCHAR(15),
cep		VARCHAR(9),
id_usuario INT
);

-- Criação da tabela Empresa
CREATE TABLE empresa (
id INT PRIMARY KEY AUTO_INCREMENT,
nome_empresa 	VARCHAR(100),
id_usuario		INT,
id_sensor		INT,
instalacao		DATETIME
);

SELECT * FROM cadastro;

INSERT INTO cadastro (nome, email,telefone, senha, cpf) VALUES
('Joao', 'joao@email.com', '119990000', '123', '100200300-10'),
('Gustavo', 'gustavo@email.com', '119991111', '12345', '120300200-20'),
('Otavio', 'otavio@email.com', '119990312', '12333', '200300100-11'),
('Gabriel', 'gabriel@email.com', '113211000', '33123', '100333222-10');

UPDATE cadastro
SET senha = '33333'
WHERE id = 1;

SELECT * FROM empresa;

INSERT INTO empresa (nome_empresa, id_usuario, id_sensor, instalacao) VALUES
('Tech Innovators Ltda', 1, 101, '2024-09-01'),
('Global Solutions S.A.', 2, 102, '2024-09-01'),
('Future Tech Inc.', 3, 103, '2024-09-01'),
('EcoFriendly Corp.', 4, 104, '2024-09-01'),
('HealthCare Pro Ltda', 5, 105, '2024-09-01');

UPDATE empresa
SET nome_empresa = 'Empresa teste'
WHERE id = 1;

INSERT INTO cozinhaEnd (
    rua,
    bairro,
    estado,
    pais,
    cidade,
    numero,
    cep,
    id_usuario
) 
VALUES 
('Rua das Flores', 'Centro', 'SP', 'Brasil', 'São Paulo', 123, '01000-000', 1),
('Avenida Paulista', 'Bela Vista', 'SP', 'Brasil', 'São Paulo', 456, '01310-100', 2),
('Rua Amazonas', 'Boa Vista', 'MG', 'Brasil', 'Belo Horizonte', 789, '30140-000', 3);

UPDATE cozinhaEnd
SET numero = 40
WHERE id = 1;

SELECT * FROM sensor;

INSERT INTO sensor (id_empresa, porcentagem, data_coleta) 
VALUES 
(1, 75.5, '2024-09-11'),
(2, 60.2, '2024-09-10'),
(3, 85.0, '2024-09-09');

UPDATE sensor
SET porcentagem = 30
WHERE id = 1;




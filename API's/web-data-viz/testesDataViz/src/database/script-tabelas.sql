CREATE DATABASE gasbusters;
USE gasbusters;


CREATE TABLE empresa(
idEmpresa  		INT PRIMARY KEY AUTO_INCREMENT,
razaoSocial  	VARCHAR(100),
nomeFantasia 	VARCHAR(100),
responsavelLegal VARCHAR(45),
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

CREATE DATABASE gasbusters;
USE gasbusters;


CREATE TABLE empresa(
idEmpresa  		INT PRIMARY KEY AUTO_INCREMENT,
razaoSocial  	VARCHAR(100),
nomeFantasia 	VARCHAR(100),
responsavelLegal varchar(45),
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

INSERT INTO cozinha VALUES (default, 'Comercial', 5, '', 3, 1);

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

SELECT * FROM usuario;

SELECT * FROM medida;

INSERT INTO medida(nivel_gas, fkSensor) VALUES
    (0, 1);

SELECT idMedida, nivel_gas, dtLeitura, fkSensor
        FROM medida
        WHERE fkSensor = 1
        ORDER BY idMedida DESC
        LIMIT 1;

SELECT m.fkSensor as idSensor, m.nivel_gas, m.dtLeitura
        FROM medida m
        JOIN sensor s ON m.fkSensor = s.idSensor
        WHERE s.fkCozinha = 1
            AND s.fkEmpresa = 1
            AND (
            SELECT COUNT(*) 
            FROM medida m2
            WHERE m2.fkSensor = m.fkSensor AND m2.idMedida >= m.idMedida
            ) <= 6
        ORDER BY m.fkSensor, m.idMedida DESC;

SELECT 
        s.idSensor AS idSensor,
        s.nomeSensor,
        m.nivel_gas AS medidaSensor,
        m.dtLeitura
    FROM sensor s
    JOIN medida m ON s.idSensor = m.fkSensor
    WHERE s.fkCozinha = 1
    AND s.fkEmpresa = 1
    AND m.idMedida = (
        SELECT m2.idMedida
        FROM medida m2
        WHERE m2.fkSensor = m.fkSensor
        ORDER BY m2.idMedida DESC
        LIMIT 1
    )
    ORDER BY s.idSensor;

SELECT 
    SUM(CASE WHEN medidasRecentes.nivel_gas BETWEEN 0 AND 10 THEN 1 ELSE 0 END) AS qtdNormal,
    SUM(CASE WHEN medidasRecentes.nivel_gas BETWEEN 11 AND 30 THEN 1 ELSE 0 END) AS qtdAlerta,
    SUM(CASE WHEN medidasRecentes.nivel_gas > 30 THEN 1 ELSE 0 END) AS qtdPerigo
FROM (
    SELECT m.fkSensor, m.nivel_gas
    FROM medida m
    JOIN (
        SELECT fkSensor, MAX(idMedida) AS ultimaMedida
        FROM medida
        GROUP BY fkSensor
    ) ultimas ON m.fkSensor = ultimas.fkSensor AND m.idMedida = ultimas.ultimaMedida
    JOIN sensor s ON m.fkSensor = s.idSensor
    WHERE s.fkCozinha = 1 AND s.fkEmpresa = 1
) medidasRecentes;


-- criação do bando de dados
create database gasbusters;

-- usar o banco de dados selecionado
use gasbusters;

-- criação da tabela de cadastro do cliente para que ele possa usar como acesso no site 
create table cadastro (
idCadastro	int primary key auto_increment,
nome		varchar(45),
email		varchar(100),
telefone	varchar(14),
senha		varchar(45),
cnpj		varchar(18),
/*dados da localização*/
cep			varchar(10),
endereço	varchar(150),
numero 		varchar(20),
bairro		varchar(50),
cidade 		varchar(50),
UF 			char(2),
/*Sensor quantidade*/
qtdSensor	int	
);

insert into cadastro values
(default,'Miguel','Miguel@sptech','(11)954854326','senha@sptech','47.450.241/0001-04',
'03045002','rua haddok','777','paulista','São Paulo','SP',1);

-- Tabela para acrescentar a quantidade de sensores e seus respectivo cliente 
create table sensorMQ2(
idSensor		int primary key auto_increment,
statusSensor 	varchar(10),
fkCadastro		int,
foreign key (fkCadastro) references cadastro(idCadastro),
constraint chkStatus check(statusSensor in('Ativo', 'Inativo'))
);

insert into sensorMQ2 values
(default,'Sensor 1','Ativo',1);

-- tabela para coletar os dados do sensor
create table medida(
idMedida			int primary key auto_increment,
sensor_analogico	float,
fkSensor			int,
foreign key (fkSensor) references sensorMQ2(idSensor)
);
-- a inserção da tabela acima (medida) sera feita pelo programa que coletara os dados e iram automaticamente inserir. 

select * from medida;

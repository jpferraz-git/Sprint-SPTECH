
create database pi;

use pi;

-- Criação da tabela do usuario

create table cliente (
id	int primary key auto_increment,
nome	varchar(50) not null,
senha	varchar(20) not null,
cpf		varchar(15) not null,
telefone	varchar(15) not null,
email		varchar(50),
endereco	varchar(100),
empresa		varchar(50) not null,
dtdata		datetime default current_timestamp
);

-- criação da tabela para o sensor MQ2

create table mq2 (
id	int primary key auto_increment,
valorsensor	int,
porcentagem	decimal(10,2)
);

-- criação da tabela de projeto

create table preco(
id	int primary key auto_increment,
investimento	decimal(10,2),
normas	decimal(10,2),
indenizacao	decimal(10,2)
);

create table obra(
id	int primary key auto_increment,
obra	decimal(10,2),
sensor	decimal(10,2),
arduino	decimal(10,2),
protoboard decimal(10,2),
jumpers	decimal(10,2)
);



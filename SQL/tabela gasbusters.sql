-- cadastro
-- sensor 
-- emdereço

-- sensor

create database gasbusters;
use gasbusters;

create table sensordegas(
id int primary key auto_increment,
saidadegasinstalada varchar(30) not null,
datadeinstalação date,
porcentagemdegas decimal(5,2),
estaativo varchar (10),
constraint chkativo check (estaativo in ("ligado","desligado")));

drop table sensordegas;

insert into sensordegas values
(default,"fogão 1", "2024-07-05","10.50","ligado");


insert into sensordegas values
(default,"fogão 3", "2024-07-05",'0',"desligado");


select * from sensordegas;

select saidadegasinstalada as "Saida Instalada" from sensordegas ;
select datadeinstalação as "Data instalação" from sensordegas ;

-- Cadastro


use gasbusters;

create table cadastro
(id int primary key auto_increment,
nome_usuario varchar (100),
cpf_usuario char(20),
nome_empresa varchar (50),
data_contratação date,
cnpj_empresa char(20),
email char (50),
senha varchar(100));

drop table cadastro;

insert into cadastro values
	(default, "Lucas Silva","987.408.550-90","Pandora Food","2024-10-05", "45.997.418/0017-10","pandorafood@oficial.com","URUBU100");
    
select * from cadastro;

insert into cadastro values
	(default, "Maria Vieira","887.328.551-40","Wood Food","2024-05-21", "37.447.121/0018-12","woodfood@oficial.com","URUBU101");
    

-- local

use gasbusters;

create table local_cozinha
	(id int primary key auto_increment,
	rua char(50),
    bairro char(50),
    estado char(50),
    pais char(50),
    cidade char(50),
    numero int,
    cep char(9));
    
drop table local_cozinha;

insert into local_cozinha values
	(default,"Rua Haddock Lobo", "Sapopemba","São Paulo", "Brasil","São Paulo",57, "01310-200");
    
delete from local_cozinha 
where id=2;

insert into local_cozinha values
	(default,"João Silveira", "São Lucas","São Paulo", "Brasil","São Paulo",337, "46980-340");

select * from local_cozinha;

-- simulador financeiro 

use gasbusters;

	create table simulador_financeiro 
    (id int primary key auto_increment,
    valor_requerido varchar(50),
    valor_multaFunci varchar(50),
    valor_mutaClient varchar(50),
    valor_reconstrução varchar(50),
    valor_percamaterial varchar(50),
    ouve_explosão_ou_não char(3),
    constraint chekExplosão check (ouve_explosão_ou_não in ('Sim','Não')));
    
    insert into simulador_financeiro values
    (default,"100,000.00", "50,000.00","30,000.00","200,000.00","85,000.00","Sim");
    
    select * from simulador_financeiro;
    
     insert into simulador_financeiro values
    (default,"150,000.00", "53,000.00","28,000.00","170,000.00","60,000.00","Sim");
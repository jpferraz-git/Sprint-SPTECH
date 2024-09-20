create database ProjetoPI;
use ProjetoPI;
create table cadastro(
id int primary key auto_increment,
nome varchar (60),
empresa varchar (60),
dataContrato date,
Valor varchar (60)
)auto_increment=1;
alter table cadastro modify column Valor int;
insert into Cadastro values
	(default, 'Bernardo Silva Machado', 'Rappy', '2024-09-01', 100.000),
	(default, 'Gustavo Mota Silveiro', 'Manual Burguer', '2024-09-04', 200.000);
    
select * from cadastro;
alter table cadastro add column qtdSensores int;
update cadastro set qtdSensores = 2
where id = 1;
update cadastro set qtdSensores = 3
where id = 2;

create table Sensor(
idSensor int primary key auto_increment,
Data Datetime,
PorcentagemGás varchar (60),
NomeEmpresa varchar(60),
Sinal varchar(60)
)auto_increment=1;

insert into Sensor values
(default, '2024-09-06 20:50:10','10%','Rappy', 'Gás detectado'),
(default, '2024-09-06 10:10:20','0%', 'Manual Burguer', 'Gás não detectado');
describe Cadastro;
select* from Cadastro;
select * from Sensor;
Create table SimulaçãoFinanceira(
 id int primary key auto_increment,
 nome varchar (60),
 empresaInteressada varchar (60),
 data date
 )auto_increment=1;
 
insert into SimulaçãoFinanceira values
(default,'Bernardo Silva Machado','Rappy', '2024-06-20'),
(default, 'Gustavo Mota Silveiro', 'Manual Burguer', '2024-06-25');













        
    
   
    

    



    
    







    
    





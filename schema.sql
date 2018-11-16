-- mysql -uroot -proot finance < schema.sql

create table users (
    id int not null auto_increment,
    username varchar(30) not null,
    cash decimal(10, 2) not null,
    primary key (id)
);

insert into users (username, cash) values ('bob', 10.50);
insert into users (username, cash) values ('sam', 20.25);

-- +----------+---------------+------+-----+---------+----------------+
-- | Field    | Type          | Null | Key | Default | Extra          |
-- +----------+---------------+------+-----+---------+----------------+
-- | id       | int(11)       | NO   | PRI | NULL    | auto_increment |
-- | username | varchar(30)   | NO   |     | NULL    |                |
-- | cash     | decimal(10,2) | NO   |     | NULL    |                |
-- +----------+---------------+------+-----+---------+----------------+

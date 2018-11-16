-- drop table users;
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
-- +----+----------+-------+
-- | id | username | cash  |
-- +----+----------+-------+
-- |  1 | bob      | 10.50 |
-- |  2 | sam      | 20.25 |
-- +----+----------+-------+

create table stocks (
    id int not null auto_increment,
    symbol varchar(30) not null,
    transaction char(1) not null,
    shares int not null,
    price decimal(10, 2) not null,
    user_id int not null,
    primary key(id),
    foreign key (user_id)
        references users(id)
        on delete cascade
);

insert into stocks (symbol, transaction, shares, price, user_id) values ('AAPL', 'B', 10, 191.50, 1);
insert into stocks (symbol, transaction, shares, price, user_id) values ('GOOG', 'B', 25, 1064.22, 1);

-- +-------------+---------------+------+-----+---------+----------------+
-- | Field       | Type          | Null | Key | Default | Extra          |
-- +-------------+---------------+------+-----+---------+----------------+
-- | id          | int(11)       | NO   | PRI | NULL    | auto_increment |
-- | symbol      | varchar(30)   | NO   |     | NULL    |                |
-- | transaction | char(1)       | NO   |     | NULL    |                |
-- | shares      | int(11)       | NO   |     | NULL    |                |
-- | price       | decimal(10,2) | NO   |     | NULL    |                |
-- | user_id     | int(11)       | NO   | MUL | NULL    |                |
-- +-------------+---------------+------+-----+---------+----------------+
-- +----+--------+-------------+--------+---------+---------+
-- | id | symbol | transaction | shares | price   | user_id |
-- +----+--------+-------------+--------+---------+---------+
-- |  1 | AAPL   | B           |     10 |  191.50 |       1 |
-- |  2 | GOOG   | B           |     25 | 1064.22 |       1 |
-- +----+--------+-------------+--------+---------+---------+

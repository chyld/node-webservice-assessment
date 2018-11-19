# stock-trader-ap

### master readme

### Overview
You will be building the "backend" of an application that allows a user to buy stocks with available funds. You will develop this app using Node and Express.js. Mysql will be the database server. You will be able to create and list users, deposit funds, get stock quotes and purchase stock.

### HTTP
This will be an HTTP application. Other applications such as browsers or microservices can access this app over HTTP.

### Languages
- Javascript

### Instructions
You can choose to implement your app in any one of the languages mentioned above. Each language has its own subdirectory.
Just `cd` into your language of choice and begin. Each language subdirectory has a `README.md` file that is specific to that langauge,
so be sure to read that file for detailed instructions on how to proceed.

The assessment is "open book", so you can use Google to help you.

### Documentation
- https://expressjs.com/en/4x/api.html
- https://github.com/mysqljs/mysql
- https://github.com/jakubroztocil/httpie
- https://www.npmjs.com/package/yahoo-stocks

### Start
- cd /home/ec2-user/environment/assessment/javascript
- nodemon index.js

note: nodemon will restart your app ever time you make a change to your .js files.
note: We have provided a index.js with some starter code to get you up and running with a connection to the live database.
note: The apps stars on PORT 8080 but can be changed with an environment variable of the same name.

### Database
- Mysql is the database that will be used
- It is already installed and schema applied
- Here is the schema for tables users and stocks

```
-- +----------+---------------+------+-----+---------+----------------+
-- | Field    | Type          | Null | Key | Default | Extra          |
-- +----------+---------------+------+-----+---------+----------------+
-- | id       | int(11)       | NO   | PRI | NULL    | auto_increment |
-- | username | varchar(30)   | NO   |     | NULL    |                |
-- | cash     | decimal(10,2) | NO   |     | NULL    |                |
-- +----------+---------------+------+-----+---------+----------------+

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
```

- Here is some sample data inserted into the above tables

```
-- +----+----------+-------+
-- | id | username | cash  |
-- +----+----------+-------+
-- |  1 | bob      | 10.50 |
-- |  2 | sam      | 20.25 |
-- +----+----------+-------+

-- +----+--------+-------------+--------+---------+---------+
-- | id | symbol | transaction | shares | price   | user_id |
-- +----+--------+-------------+--------+---------+---------+
-- |  1 | AAPL   | B           |     10 |  191.50 |       1 |
-- |  2 | GOOG   | B           |     25 | 1064.22 |       1 |
-- +----+--------+-------------+--------+---------+---------+
```

- You can access the database with the following command
- `mysql -uroot -pROOT finance`
- Here are some example commands from the mysql prompt, check out the documentation for more info.

```
mysql> show tables;
mysql> select * from users;
mysql> quit
```

### HTTPie
- https://github.com/jakubroztocil/httpie

I have selected the CLI application to aid in the development and debugging of your HTTP APIs. It's similar in concept to CURL, but a much cleaner API. You can read the docs for more info, but I'll provide some examples below for motivation.

If your node app is running, you can open another terminal and type:
- `http -v :8080` # this will perform a GET on / on port 8080
- `http -v :8080/users` # GET on /users on port 8080
- `http -v post :8080/users username=chyld cash:=30.33` # POST to /users and send JSON payload `{username:'chyld', cash:30.33}`
- `http -v put :8080/users/deposit/100 X-User:2` # PUT /users/deposit/:amount, with $100 as amount of deposit and user is sent over HTTP headers
- `http -v post :8080/stocks/purchase X-User:2 symbol=aapl shares:=10` POST /stocks/purchase, user sent of header and JSON payload with details

### Requirements
- The app shall be executed from the command line
- Organize your code into files, classes, functions as appropriate.
- Use an external config file for default values.
- Practice "clean code", i.e., variable names, code structure, comments, styling.
- Use docstrings for function documentation.
- The code is inside a git repository, branch your code into a `dev` branch and then commit your code, using appropriate commit messages as you progress. Once finished merge the `dev` branch back into `master`.
- Create an HTTP endpoint, `GET /users`
  - This shall query the `users` table for all users
  - Send back all user details encoded as JSON
- Create an HTTP endpoint, `POST /users`
  - This shall create a user in the `users` table
  - Send the `username` and `cash` in the payload as JSON to the endpoint
  - If the users already exists, send back an error message
  - If successfull, send back the created user as JSON
- Create an HTTP endpoint, `PUT  /users/deposit/:amount`
  - This shall deposit funds into a user's account
  - Send in the `amount` as a path variable
  - Send in the `user` as an HTTP header `X-User`
  - Add the amount in the user's account plus the amount you just sent
  - Send back the user's current total funds available for stock purchase as JSON
- Create an HTTP endpoint, `GET  /stocks/quote/:symbol`
  - Get a stock quote based on a stock symbol
  - A yahoo stock node module as been installed to aid in this
  - https://www.npmjs.com/package/yahoo-stocks
  - Send back stock quote info as JSON
- Create an HTTP endpoint, `POST /stocks/purchase`
  - The endpoint will take a user id, stock symbol and number of shares
  - Send `X-User` as user id in the HTTP headers and send `symbol` and `shares` in the JSON payload
  - Get the user from the database
  - Get a current stock quote for the provided symbol
  - Determine if the user has the funds to make the purchase
  - If the user does not have the funds send back an error message
  - If the user does have the funds then subtract the purchase amount from the cash of the user and persist that to the users table
  - Then add a record to the `stocks` table. All fields should be self explanatory, except for `transaction`. Use "B" for Buy.
  - At successfull completion, the users table will be updated and the stocks table shall have a new row
  - Send back info about the purchase as JSON

### Endpoints
- At the conclusion of the assessment, you should have completed the following HTTP APIs:

* GET  /
* GET  /users
* POST /users
* PUT  /users/deposit/:amount
* GET  /stocks/quote/:symbol
* POST /stocks/purchase

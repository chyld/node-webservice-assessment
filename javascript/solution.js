/* API Endpoints
 *
 * GET  /
 * GET  /users
 * POST /users
 * PUT  /users/deposit/:amount
 * GET  /stocks/quote/:symbol
 * POST /stocks/purchase
 *
*/

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const yahoo = require('yahoo-stocks');

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const pool = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'finance'
});

// ------------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------------ //
// http -v :8080
app.get('/', (req, res) => res.send('Hello World!'));

// ------------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------------ //
// http -v :8080/users
app.get('/users', (req, res) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query('select * from users', [], (err, results, fields) => {
            if (err) throw err;
            connection.release();
            res.json({users: results} );
        });
    });
});

// ------------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------------ //
// http -v post :8080/users username=chyld cash:=30.33
app.post('/users', (req, res) => {
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        // TODO: check for duplicate users before inserting
        connection.query('insert into users (username, cash) values (?, ?)', [req.body.username, req.body.cash], (err, results, fields) => {
            if (err) throw err;
            connection.release();
            res.json({id: results.insertId, ...req.body} );
        });
    });
});

// ------------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------------ //
// http -v put :8080/users/deposit/100 X-User:2
app.put('/users/deposit/:amount', (req, res) => {
    const userId = req.headers['x-user'];
    const amount = req.params.amount * 1;
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query('select * from users where id = ?', [userId], (err, results, fields) => {
            if (err) throw err;
            const cash = results[0].cash;
            const total = cash + amount;
            connection.query('update users set cash = ? where id = ?', [total, userId], (err, results, fields) => {
                if (err) throw err;
                connection.release();
                res.json({balance: total});
            });
        });
    });
});

// ------------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------------ //
// http -v :8080/stocks/quote/goog
app.get('/stocks/quote/:symbol', (req, res) => {
    const symbol = req.params.symbol.toUpperCase()
    yahoo.lookup(symbol).then(data => {
        res.json(data);
    }); 
});

// ------------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------------ //
// http -v post :8080/stocks/purchase X-User:2 symbol=aapl shares:=10
app.post('/stocks/purchase', (req, res) => {
    const userId = req.headers['x-user'];
    const symbol = req.body.symbol.toUpperCase();
    const shares = req.body.shares;
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query('select * from users where id = ?', [userId], (err, results, fields) => {
            if (err) throw err;
            const cash = results[0].cash;
            yahoo.lookup(symbol).then(data => {
                const price = data.currentPrice;
                const total = price * shares;
                if(cash < total){
                    connection.release();
                    res.json({error: 'Not enough funds available for this transaction. Please deposit additional funds.'});
                }else{
                    connection.query('insert into stocks (symbol, transaction, shares, price, user_id) values (?, ?, ?, ?, ?);', [symbol, 'B', shares, price, userId], (err, results, fields) => {
                        if (err) throw err;
                        const cashRemaining = cash - total;
                        connection.query('update users set cash = ? where id = ?', [cashRemaining, userId], (err, results, fields) => {
                            if (err) throw err;
                            connection.release();
                            res.json({success: 'You have successfully purchased shares. View your account for details.'});
                        });
                    });
                }
            }); 
        });
    });
});

// ------------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------------ //

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

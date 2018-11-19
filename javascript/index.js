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
    password : 'ROOT',
    database : 'finance'
});

app.get('/', (req, res) => res.send('Hello World!'));

/*
 *
 *
 * ADD MORE ENDPOINTS
 *
 *
 */
 
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

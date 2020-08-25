require('dotenv').config();
var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection = require('express-myconnection');
var flash = require('express-flash');
var nocache = require('nocache');
var fileUpload = require('express-fileupload');



app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(nocache());
app.use(cookieParser());
app.use(session({
    secret: 'webhungers test',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true, maxAge: 60000},
}));
app.use(flash());


/* app.use(function(req, res, next){
    if(req.session.isUserLoggedIn){
        console.log('session set', req.session.isUserLoggedIn);
    }
    else{
        console.log('session is not set');
    }
    next();
}); */

// app.use(md5);
const conn = connection(mysql, {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT, //port mysql
    database: process.env.DB_DATABASE,
    charset: 'utf8mb4',
    multipleStatements: true
}, 'single');

app.use(conn);

var indexRouter = require('./routers/index');
app.use('/', indexRouter);



var port = process.env.PORT | 2500;
app.listen(port, function(req, res){
    console.log('Server Started');
});
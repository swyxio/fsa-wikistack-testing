var express = require('express');
var swig = require('swig');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();
var wikiRouter = require('./routes/wiki');
var usersRouter = require('./routes/users');

app.engine('html', swig.renderFile);
swig.setDefaults({ cache: false });
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));

app.use('/wiki', wikiRouter);
app.use('/users', usersRouter);

app.get('/', function (req, res) {
    res.redirect('/wiki');
});

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send(err.message);
});

module.exports = app;
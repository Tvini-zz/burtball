const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const status = require('http-status');

const logger = require('./utils/logger');
const filters = require('./utils/filters');

const sessionMiddleware = session({
    secret: 'LKJk234j3las34KJ5sla4sdl',
    resave: false,
    saveUninitialized: true
});

io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

app.use(compression());
app.use(filters.corsFilter);
app.use(express.static('public'));
app.use(logger.expressLogger);

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(sessionMiddleware);

app.use(function errorHandler(err, req, res, next) {
    logger.error(err);
    res.status(status.INTERNAL_SERVER_ERROR).send({error: err});
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        console.log(socket.request.session.id);

        io.emit('chat message', msg);
    });
});

module.exports = http;


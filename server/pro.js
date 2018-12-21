const Koa = require('koa');
const app = new Koa();
const server = require('http').createServer(app.callback());
const socket = require('./socket');
socket(server);

const path = require('path');
const static = require('koa-static');
const views = require('koa-views');

app.use(require('koa-json')());
app.use(require('koa-bodyparser')());

app.use(views(path.join(__dirname, '../dist'), { extension: 'html' }))
app.use(static(path.join(__dirname, '../dist')));
app.use(static(path.join(__dirname, '../static')));
require('../routes')(app);

server.listen(8080);
console.log("AppServer and SocketServer at: http://127.0.0.8080")
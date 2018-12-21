const Koa = require('koa');
const app = new Koa();
const server = require('http').createServer(app.callback());
const socket = require('./socket');
socket(server);


app.use(require('koa-json')());
app.use(require('koa-bodyparser')());

require('../routes')(app);

server.listen(3000);
console.log("view at: http://127.0.0.8080")
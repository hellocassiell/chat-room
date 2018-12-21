const route = require('koa-route');

let info = require("./information/info");
let log = require("./auth/log");


module.exports = function(app){
	[
		route.get('/',async function (ctx, next) {
		  await ctx.render('index');
		})
		,route.get('/userlist',info.userlist)
		,route.get('/currusers',info.currusers)
		,route.get('/pagetest',info.pagetest)
		,route.get('/chatrecord',info.chatrecord)
		,route.post('/login',log.login)
		,route.post('/logout',log.logout)

	].forEach(route=>{
		app.use(route);
	})
}
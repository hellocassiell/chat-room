let ROOT = process.cwd();
const redisClient = require(ROOT+"/dbServer/redisClient")

let login = async function(ctx){

	let body = ctx.request.body;
	let username = body.username;

	redisClient.saddAsync('userlist',username);
	redisClient.saddAsync('userheart',username);
	console.log(username, ' login.');
	ctx.body = '';
}

let logout = async function (ctx){

	let body = ctx.request.body;
	let username = body.username;

	await redisClient.sremAsync('userlist',username);
	console.log(username,' logout.');
	ctx.body = '';
}



module.exports = {
	login,
	logout
}
let ROOT = process.cwd();
const redisClient = require(ROOT+"/dbServer/redisClient")


module.exports = function(server){
	let heartbeat = new Set();
	const io = require('socket.io')(server);
	io.on('connection', function(socket){
		console.log('a user connected');
		socket.on('chat message', function(msg){
			io.emit('chat message', msg);
			redisClient.rpush('chatrecord',msg);
		});
		socket.on('heartbeat', async function(username){
			heartbeat.add(username);
		});
	});
	setInterval(() => {
		redisClient.smembersAsync('userheart').then((users)=>{
			for (var user of users) {
				if(!heartbeat.has(user)) {
					redisClient.sremAsync('userheart', user);
					console.log(user, 'leave the room');
				}
			}
			heartbeat.clear();
		})
	}, 10000);
}


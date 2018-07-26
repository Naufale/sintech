const { ShardingManager } = require('discord.js');
const TOKEN = process.env.SECRET;

const shards = new ShardingManager('./server.js', {
    token: TOKEN,
    totalShards: 15
});

shards.on('launch', shard => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Launched shard #${shard.id}`);
});

shards.on('message', (shard, msg) => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] #${shard.id} | ${msg._eval} | ${msg._result}`);
});

shards.spawn();

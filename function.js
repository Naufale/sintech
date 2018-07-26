
const sm = require('string-similarity');
 
module.exports = { 
  ping: function() { 
    return 'Hello!'; 
  },
  embed: function(channel, message, timer) { 
    channel = channel.channel || channel;
    channel.send({embed:{ 
      description: message, 
      color: 0x1db954 
    }}).then(msg => { 
      if (!isNaN(timer)) msg.delete({timeout: timer}); 
    });
  },
  autocomplete: function(message, string) { 
  let members = [];
  let indexes = [];
  message.guild.members.forEach(function(member){ 
    members.push(member.user.username);
    indexes.push(member.id); 
  });
  let match = sm.findBestMatch(string, members);
  let username = match.bestMatch.target;
  let member = message.guild.members.get(indexes[members.indexOf(username)]); 
    return member;
  }
};

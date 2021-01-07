const moment = require('moment');

module.exports = (client, commandOptions) => {

  const prefix = 'h!';

  let {
    name,
    aliases,
    description,
    expectedArgs = '',
    minArgs = 0,
    maxArgs = null,
    permissions = [],
    requiredRoles = [],
    run
  } = commandOptions;

  // make sure aliases are always in an array
  if(typeof aliases === 'string') {
    aliases = [aliases];
  }

  // assign name of command as an alias
  aliases.push(name);

  // check if permissions exist, and if so then
  // make sure they're parsed as an array and
  // validate them
  if(permissions.length) {
    if(typeof permissions === 'string') {
      permissions = [permissions];
    }

    validatePermissions(permissions);
  }
  
  client.on('message', async (message) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    const { member, content, guild } = message;

    for (const alias of aliases) {
      if(content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)) {

        // check if user has required permissions
        for(const permission of permissions) {
          if(!member.hasPermission(permission)) {
            return message.channel.send("You do not have permission.");
          }
        }

        // check if user has required roles
        for(const requiredRole of requiredRoles) {
          let role = guild.roles.cache.find(r => r.name == requiredRole);

          if(!role || !member.roles.cache.has(role.id)) {
            return message.channel.send(`You must have the ${requiredRole} to use this command.`);
          }
        }

        // get arguments;
        const args = content.split(/[ ]+/)

        // remove prefix
        args.shift();

        const argresult = args.join(" ");

        // check number of arguments
        if(args.length < minArgs || maxArgs !== null && args.length > maxArgs) {
          return message.channel.send(`Incorrect usage! Use ${prefix}${alias} ${expectedArgs}`);
        }

        if(client.configFile.logging) {
          let loggingOutput;
          loggingOutput = `[\x1b[36m${moment().format("LLLL")}\x1b[0m] Command ${prefix}${alias} was executed by \x1b[36m${member.user.tag}\x1b[0m (ID: \x1b[36m${member.id}\x1b[0m)`;
          console.log(loggingOutput);
        }

        // handle the actual command
        return run(message, args, argresult);

      };
    }



  });

}

async function validatePermissions(permissions) {
  let validPermissions = [
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'ADMINISTRATOR',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'ADD_REACTIONS',
    'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',
    'STREAM',
    'VIEW_CHANNEL',
    'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MENTION_EVERYONE',
    'USE_EXTERNAL_EMOJIS',
    'VIEW_GUILD_INSIGHTS',
    'CONNECT',
    'SPEAK',
    'MUTE_MEMBERS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS'
  ];

  for(const permission of permissions) {
    if(!validPermissions.includes(permission)) {
      throw new TypeError(`Permission is not valid: ${permission}`);
    }
  }
}
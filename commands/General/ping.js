module.exports = {
    name: 'ping',
    aliases: ['pong', 'pingpong'],
    description: 'Pong!',
    //expectedArgs: '',
    //minArgs: 0,
    //maxArgs: 0,
    //permissions: [],
    //requiredRoles: []
    run: (message, args, text) => {
        message.reply("Pong!");
    }
}
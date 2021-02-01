
const jimp = require("jimp");
const fs = require("fs");

module.exports = {
    enabled: true,
    name: 'profile',
    aliases: ['prf', 'userprofile', 'social profile'],
    description: 'View someone\'s profile.',
    expectedArgs: '<[@Member]>',
    minArgs: 0,
    maxArgs: null,
    permissions: [],
    requiredRoles: [],
    run: async (message) => {
        let client = message.client;
        let user = message.mentions.members.first() || message.author;

        await message.channel.startTyping();

        let rep = 0;
        let credits = 0;
        let { exp, level } = client.userData.get(user.id);
        let nextLevel = 25 * level * (1 + level);

        jimp.read("./Storage/utils/profile/CLFKrdm.png").then((image) => {
            jimp.read(message.author.displayAvatarURL({format: 'png'})).then((avatar) => {
                jimp.read("./Storage/utils/profile/r1ZCemf.png").then((_retangle) => {
                    jimp.loadFont(jimp.FONT_SANS_32_WHITE).then((font2) => {
                        jimp.loadFont(jimp.FONT_SANS_16_WHITE).then((font) => {
                            avatar.resize(79, 73);
                            image.composite(avatar, 15, 79);
                            image.print(font, 218, 225, ` ${rep}`);

                            switch(true) {
                                case level > 10:
                                    image.print(font2, 180, 158, `${level}`);
                                    break;
                                case level < 10:
                                    image.print(font2, 189, 158, `${level}`);
                            }

                            switch(true) {
                                case exp < 1:
                                    image.print(font, 186, 122, `${exp}/${nextLevel}`);
                                    break;
                                case exp > 10000:
                                    image.print(font, 186, 122, `${exp}/${nextLevel}`);
                                    break;
                                case exp < 10000 && exp > 1:
                                    image.print(font, 159, 122, `${exp}/${nextLevel}`);
                            }

                            let name = user.username;
                            if (user.username.length > 12) {
                                name = user.username.substring(0, 9) + "...";
                            }

                            image.print(font, 8, 161, `${name}`);
                            image.print(font, 160, 243, ` ${credits}`);

                            let outputfile = `./Storage/utils/profile/profile-${user.id}.${image.getExtension()}`;
                            image.write(outputfile, function () {
                                message.channel.send(`:frame_photo: | Profile card for **${user.tag}**`,
                                    {
                                    files: [outputfile],
                                    })
                                    .then(function () {
                                        fs.unlink(outputfile, function (err) {
                                            if (err) return console.log(err);
                                        });
                                    });
                            });
                         });
                    });
                });
            });
        });

        return message.channel.stopTyping();
    }
};
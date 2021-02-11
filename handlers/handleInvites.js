const Data = require('../data/Data');

module.exports = async (invite) => {

    let inviter = invite.inviter;
    let client = invite.client;
    let guild = invite.guild;
    
    if(inviter) {
        let rewards = await Data.getInviteRewards(invite.guild.id).rewards;

        for(const reward of rewards) {
            if(invite.uses === reward.uses) {
                inviter.send(client.language.invites.rewardUser(reward.uses, reward.reward));

                if(!reward.rewardAction) return;


                switch(true) {
                    case reward.rewardAction.type === "addRole":
                        try {
                            guild.members.cache.get(inviter.id)
                            .roles.add(guild.roles.cache.find(r => r.name === rewardAction.role)); // jshint ignore:line
                        } catch(e) {
                            throw TypeError("Invite Rewards configuration invalid. Please check it and try again.");
                        }

                        break;
                    case reward.rewardAction.type === "giveChannelPerm" && rewardAction.permission === "VIEW_CHANNEL":
                        try {
                            guild.channels.cache.get(rewardAction.channelID)
                            .updateOverwrite(inviter.id, {
                                VIEW_CHANNEL: true
                            });
                        } catch(e) {
                            throw TypeError("Invite Rewards configuration invalid. Please check it and try again.");
                        }

                        break;
                    case reward.rewardAction.type === "giveChannelPerm" && rewardAction.permission === "SEND_MESSAGES":
                        try {
                            guild.channels.cache.get(rewardAction.channelID)
                            .updateOverwrite(inviter.id, {
                                SEND_MESSAGES: true
                            });
                        } catch(e) {
                            throw TypeError("Invite Rewards configuration invalid. Please check it and try again.");
                        }

                        break;
                    default:
                        return false;
                }

            }
        }

    }


};



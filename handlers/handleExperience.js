const Data = require('../data/Data');

module.exports = async (client) => {

    let array = client.userData.keyArray();

    for(let i = 0; i < array.length; i++) {
        Data.pushExperience(client.userData.get(array[i]), array[i]);
    }
    
};
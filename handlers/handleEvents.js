module.exports = async (client, eventOptions) => {

    let {
        name,
        enabled,
        run
    } = eventOptions;

    if(!enabled) {
        return console.log(`[Light] "${name}" event is disabled.`);
    }

    return run(client);
};



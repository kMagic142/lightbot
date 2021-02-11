const { readdir } = require('fs').promises;
const { resolve, parse } = require('path');

module.exports.getFiles = async (dir) => {
    const subdirs = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(subdirs.map((subdir) => {
      const res = resolve(dir, subdir.name);
      return subdir.isDirectory() ? this.getFiles(res) : res;
  }));
  return Array.from(new Set(files.flat()));
};

module.exports.getDirectories = async (dir) => {
    const subdirs = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(subdirs.map((subdir) => {
      const res = resolve(dir, subdir.name);
      return subdir.isDirectory() ? this.getDirectories(res) : parse(res).dir;
  }));
  return Array.from(new Set(files.flat()));
};

module.exports.parseTime = async (time) => {

    time = time.toLowerCase();
    if(!time.match(/\d{1,8}[smhd]?\b/)) return -1;

    let multiplier = 1;

    switch(time.charAt(time.length - 1)) {
        case 'd':
            multiplier *= 24; // jshint ignore:line
        case 'h':
            multiplier *= 60; // jshint ignore:line
        case 'm':
            multiplier *= 60; // jshint ignore:line
        case 's':
            time = time.substring(0, time.length - 1);
    }

    return multiplier * parseInt(time);

};
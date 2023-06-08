const bcrypt = require("bcrypt");

const COST_FACTOR = 10;
async function hashPass(password) {
    return await bcrypt.hash(password, COST_FACTOR);
}

async function cmpPass(password, hash) {
    return await bcrypt.compare(password, hash);
}

module.exports = {
    hashPass,
    cmpPass
};
const TaichiClient = require('./structures/TaichiClient');
const config = require('../config.json');

const client = new TaichiClient(config);
client.start();
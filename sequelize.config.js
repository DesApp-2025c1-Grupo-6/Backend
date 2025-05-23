require('ts-node/register');
const path = require('path');

const config = require(path.resolve(__dirname, 'src/config/config.ts'));
module.exports = config.default || config;
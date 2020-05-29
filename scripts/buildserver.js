process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
const configFactory = require('../config/webpack.config.server');
const config = configFactory('production');
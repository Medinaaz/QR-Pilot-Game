const env = process.env.NODE_ENV;

const development = {
    LOGIN_URL: 'https://qrpilot-back.appspot.com/login/',
};

const production = {
    LOGIN_URL: 'https://qrpilot-back.appspot.com/login/',
};

const config = {
    development, production
};

module.exports = config[env];

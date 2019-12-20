const env = process.env.NODE_ENV;

const development = {
    LOGIN_URL: 'https://qrpilot-back.appspot.com/login/',
    SIGNUP_URL : 'https://qrpilot-back.appspot.com/signUp'
};

const production = {
    LOGIN_URL: 'https://qrpilot-back.appspot.com/login/',
    SIGNUP_URL : 'https://qrpilot-back.appspot.com/signUp'
};

const config = {
    development, production
};

module.exports = config[env];

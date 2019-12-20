const env = process.env.NODE_ENV;

const development = {
    LOGIN_URL: 'https://qrpilot-back.appspot.com/login/',
    SIGNUP_URL : 'https://qrpilot-back.appspot.com/signUp',
    GAME_URL: 'https://qrpilot-back.appspot.com/game'
};

const production = {
    LOGIN_URL: 'https://qrpilot-back.appspot.com/login/',
    SIGNUP_URL : 'https://qrpilot-back.appspot.com/signUp',
    GAME_URL: 'https://qrpilot-back.appspot.com/game'
};

const config = {
    development, production
};

module.exports = config[env];

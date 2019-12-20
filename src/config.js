const env = process.env.NODE_ENV;

const development = {
    LOGIN_URL: 'https://qrpilot-back.appspot.com/login/',
    SIGNUP_URL : 'https://qrpilot-back.appspot.com/signUp',
    GAME_URL: 'https://qrpilot-back.appspot.com/game',
    UPDATE_LOCATION_URL: "https://qrpilot-back.appspot.com/update-location/"
};

const production = {
    LOGIN_URL: 'https://qrpilot-back.appspot.com/login/',
    SIGNUP_URL : 'https://qrpilot-back.appspot.com/signUp',
    GAME_URL: 'https://qrpilot-back.appspot.com/game',
    GET_LOCATION_URL: "https://qrpilot-back.appspot.com/get-location/"
};

const config = {
    development, production
};

module.exports = config[env];

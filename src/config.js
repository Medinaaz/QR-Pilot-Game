const env = process.env.NODE_ENV;

const development = {
    LOGIN_URL: 'https://qrpilot-api.appspot.com/login/',
    SIGNUP_URL : 'https://qrpilot-api.appspot.com/signUp',
    GAME_URL: 'https://qrpilot-api.appspot.com/game',
    UPDATE_LOCATION_URL: "https://qrpilot-api.appspot.com/update-location/",
    JOIN_URL: "https://qrpilot-api.appspot.com/game-join/"
};

const production = {
    LOGIN_URL: 'https://qrpilot-api.appspot.com/login/',
    SIGNUP_URL : 'https://qrpilot-api.appspot.com/signUp',
    GAME_URL: 'https://qrpilot-api.appspot.com/game',
    UPDATE_LOCATION_URL: "https://qrpilot-api.appspot.com/update-location/",
    JOIN_URL: "https://qrpilot-api.appspot.com/game-join/"
};

const config = {
    development, production
};

module.exports = config[env];

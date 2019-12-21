const env = process.env.NODE_ENV;

const development = {
    LOGIN_URL: 'https://qrpilot-api.appspot.com/login/',
    SIGNUP_URL : 'https://qrpilot-api.appspot.com/signUp',
    GAME_URL: 'https://qrpilot-api.appspot.com/game',
    UPDATE_LOCATION_URL: "https://qrpilot-api.appspot.com/update-location/",
    JOIN_URL: "https://qrpilot-api.appspot.com/game-join/",
    PROFILE_URL: "https://qrpilot-api.appspot.com/user/"
};

const production = {
    LOGIN_URL: 'https://qrpilot-api.appspot.com/login/',
    SIGNUP_URL : 'https://qrpilot-api.appspot.com/signUp',
    GAME_URL: 'https://qrpilot-api.appspot.com/game',
    UPDATE_LOCATION_URL: "https://qrpilot-api.appspot.com/update-location/",
    JOIN_URL: "https://qrpilot-api.appspot.com/game-join/",
    PROFILE_URL: "https://qrpilot-api.appspot.com/user/"
};

const config = {
    development, production
};

module.exports = config[env];

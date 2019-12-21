const env = process.env.NODE_ENV;



const BASE_URL = "https://qrpilot-backend-api.appspot.com/"

const development = {
    LOGIN_URL: BASE_URL + "login/",
    SIGNUP_URL : BASE_URL + "signUp",
    GAME_URL:  BASE_URL + "/game",
    UPDATE_LOCATION_URL: BASE_URL +  "update-location/",
    JOIN_URL:  BASE_URL + "game-join/",
    PROFILE_URL:  BASE_URL + "user/",
    SUBMIT_QR_URL: BASE_URL + "submit-QR"
};

const production = {
    LOGIN_URL: BASE_URL + "login/",
    SIGNUP_URL : BASE_URL + "signUp",
    GAME_URL:  BASE_URL + "/game",
    UPDATE_LOCATION_URL: BASE_URL +  "update-location/",
    JOIN_URL:  BASE_URL + "game-join/",
    PROFILE_URL:  BASE_URL + "user/",
    SUBMIT_QR_URL: BASE_URL + "submit-QR"
};

const config = {
    development, production
};

module.exports = config[env];

export default class CustomHttpService {

    config;
    token;

    setConfig = (config) => {
        this.config = config;
    };

    setToken = (token) => {
        this.token = token;
    };

    fetch = (options) => {

        let fullApiPath = `${this.config.API_PATH}${options.endpoint}`;
        let body = options.body || {};
        let method = options.method || 'get';

        let fetchOptions = {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': this.token
            }
        }

        if (method == "post") {
            fetchOptions.body = JSON.stringify(body);
        }

        return fetch(fullApiPath, fetchOptions).then(function(response) { return response.json(); })
    }
}
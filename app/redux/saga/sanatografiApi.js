/**
 * API çağrılarını yazdığımız sınıf adı.
 */

export default class SanatografiApi {

    httpService;
    token;

    setHttpService = (httpService) => {
        this.httpService = httpService;
    };

    setToken = (token) => {
        this.token = token;
        return this.httpService.setToken(token)
    };

    doLogin = (loginData) => {
        return this._doPost("/auth/login", loginData);
    };

    doSignUp = (userData) => {
        return this._doPost("/auth/signUp", userData);
    };

    resetPasswordRequest = (resetData) => {
        return this._doPost("/auth/request/reset-password", resetData);
    }

    updatePassword = (passwordData) => {
        return this._doPost("/auth/update/password", passwordData);
    }

    getProjects = () => {
        return this._doGet(`/project`);
    };

    getProjectCategories = () => {
        return this._doGet(`/project/categories`);
    };

    getFeaturedProjects = () => {
        return this._doGet(`/project/featured`);
    };

    getVisuals = () => {
        return this._doGet(`/visual`);
    };

    getEvents = () => {
        return this._doGet(`/project/event`);
    };

    doReservation = (reservationData) => {
        return this._doPost(`/reservation`, reservationData);
    };

    getReservations = (userData) => {
        return this._doGet(`/reservation`, userData);
    };

    getReservationQuotaStatus = (eventId) => {
        return this._doGet(`/reservation/reservation-quota/status/${eventId}`);
    };

    _doPost = (endpoint, body) => {
        return this.httpService.fetch({
            method : 'post',
            body,
            endpoint
        });
    };

    _doGet = (endpoint) => {
        return this.httpService.fetch({
            method : 'get',
            endpoint
        });
    };

}
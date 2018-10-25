import {takeLatest, call, put} from "redux-saga/effects";
import sanatografiApi from "./configureApi";
import * as $ from "../actionTypes";
import moment from 'moment'
import 'moment/locale/tr';

const $A = function(type, payload) {
    return { type, payload }
};

const loginSaga = function*(action) {
    let {loginData} = action.payload;
    let apiResponse = yield call(sanatografiApi.doLogin, loginData);
    if (apiResponse.status == "fail") {
        yield put({type: $.LOGIN_FAILURE, payload: apiResponse.message});
    }
    else {
        sanatografiApi.setToken(apiResponse.data.xAuthToken);
        yield put({type: $.LOGIN_SUCCESS, payload: apiResponse.data});
    }
};

const signUpSaga = function*(action) {
    let {userData} = action.payload;

    let apiResponse = yield call(sanatografiApi.doSignUp, userData);
    yield put({type: $.SIGN_UP_SUCCESS, payload: apiResponse.data});

};

const requestResetPasswordSaga = function*(action) {
    let {email} = action.payload;

    yield call(sanatografiApi.resetPasswordRequest, {email});
    // yield put({type: $.SIGN_UP_SUCCESS, payload: apiResponse.data});
};

const updatePasswordSaga = function*(action) {
    let {email, code, password} = action.payload;

    let apiResponse = yield call(sanatografiApi.updatePassword, {email, code, password});
    yield put({type: $.UPDATE_PASSWORD_SUCCESS, payload: apiResponse.data});
};

const getProjectsSaga = function*(action) {
    let apiResponse = yield call(sanatografiApi.getProjects);
    let apiResponseVisuals = yield call(sanatografiApi.getVisuals);
    let apiResponseEvents = yield call(sanatografiApi.getEvents);
    let eventData = apiResponseEvents.data;

    for (let eventDataItem in eventData) {
        moment(eventData[eventDataItem].date).isAfter(moment()) ?  eventData[eventDataItem].status = 1 : eventData[eventDataItem].status = 2
    }

    let apiPayload = [apiResponse.data, apiResponseVisuals.data, eventData];
    yield put($A($.GET_PROJECTS_SUCCESS, apiPayload));
};

const getProjectCategoriesSaga = function*(action) {
    let apiResponse = yield call(sanatografiApi.getProjectCategories);
    yield put($A($.GET_PROJECT_CATEGORIES_SUCCESS, apiResponse.data));
};

const getFeaturedProjectsSaga = function*(action) {
    let apiResponse = yield call(sanatografiApi.getFeaturedProjects);
    let apiResponseVisuals = yield call(sanatografiApi.getVisuals);
    let apiResponseEvents = yield call(sanatografiApi.getEvents);
    let eventData = apiResponseEvents.data;

    for (let eventDataItem in eventData) {
        moment(eventData[eventDataItem].date).isAfter(moment()) ?  eventData[eventDataItem].status = 1 : eventData[eventDataItem].status = 2
    }

    let apiPayload = [apiResponse.data, apiResponseVisuals.data, eventData];
    yield put($A($.GET_FEATURED_PROJECTS_SUCCESS, apiPayload));
};

const getEventsSaga = function*(action) {
    let apiResponse = yield call(sanatografiApi.getEvents);
    let eventData = apiResponse.data;

    for (let eventDataItem in eventData) {
        moment(eventData[eventDataItem].date).isAfter(moment()) ?  eventData[eventDataItem].status = 1 : eventData[eventDataItem].status = 2
    }

    yield put($A($.GET_EVENTS_SUCCESS, eventData));
};

const reservationSaga = function*(action) {
    let {reservationData} = action.payload;

    let apiResponse = yield call(sanatografiApi.doReservation, reservationData);
    yield put({type: $.POST_RESERVATION_SUCCESS, payload: apiResponse.data});
};

const getReservationSaga = function*(action) {
    let {userData} = action.payload;

    let apiResponse = yield call(sanatografiApi.getReservations, userData);
    yield put({type: $.GET_RESERVATION_SUCCESS, payload: apiResponse.data});
};

const getReservationQuotaStatusSaga = function*(action) {
    let {eventId} = action.payload;

    let apiResponse = yield call(sanatografiApi.getReservationQuotaStatus, eventId);
    yield put({type: $.GET_RESERVATION_QUOTA_STATUS_SUCCESS, payload: apiResponse.data});
};


export default sanatografiSaga = function*() {
    yield takeLatest($.LOGIN_REQUEST, loginSaga);
    yield takeLatest($.GET_PROJECTS_REQUEST, getProjectsSaga);
    yield takeLatest($.GET_PROJECT_CATEGORIES_REQUEST, getProjectCategoriesSaga);
    yield takeLatest($.GET_FEATURED_PROJECTS_REQUEST, getFeaturedProjectsSaga);
    yield takeLatest($.SIGN_UP_REQUEST, signUpSaga);
    yield takeLatest($.POST_RESERVATION_REQUEST, reservationSaga);
    yield takeLatest($.GET_RESERVATION_REQUEST, getReservationSaga);
    yield takeLatest($.GET_EVENTS_REQUEST, getEventsSaga);
    yield takeLatest($.REQUEST_RESET_PASSWORD_REQUEST, requestResetPasswordSaga);
    yield takeLatest($.UPDATE_PASSWORD_REQUEST, updatePasswordSaga);
    yield takeLatest($.GET_RESERVATION_QUOTA_STATUS_REQUEST, getReservationQuotaStatusSaga);
};



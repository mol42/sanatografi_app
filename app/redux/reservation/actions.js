import * as $ from "../actionTypes";

export function doReservation(reservationData) {
    return {
        type: $.POST_RESERVATION_REQUEST,
        payload : {reservationData}
    }
}

export function resetReservationState() {
    return {
        type: $.RESET_RESERVATION_REQUEST
    }
}

export function getReservation(userData) {
    return {
        type: $.GET_RESERVATION_REQUEST,
        payload : {userData}
    }
}

export function fetchReservationQuotaStatus(eventId) {
    return {
        type: $.GET_RESERVATION_QUOTA_STATUS_REQUEST,
        payload : {eventId}
    }
}

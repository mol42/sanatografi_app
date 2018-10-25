import * as $ from "../actionTypes";

const initialState = {
    reservationCompleted : false,
    reservationResult : {},
    reservations: [],
    quotaStatusInProgress : false, 
    quotaStatusCompleted : false,
    totalReservationCount : 0,
    reservationQuota : 0
};

export default (state = initialState, action) => {

    if (action.type == $.POST_RESERVATION_REQUEST) {
        return {
            ...state,
            reservationCompleted : false,
            reservationResult : {}
        }
    }

    if (action.type == $.RESET_RESERVATION_REQUEST) {
        return {
            ...state,
            quotaStatusInProgress : false,
            quotaStatusCompleted : false,
            reservationCompleted : false,
            reservationResult : {}
        }
    }

    if (action.type == $.POST_RESERVATION_SUCCESS) {

        return {
            ...state,
            reservationCompleted : true,
            reservationResult : action.payload
        }
    }

    if (action.type == $.GET_RESERVATION_SUCCESS) {

        return {
            ...state,
            reservations : action.payload
        }
    }

    if (action.type == $.GET_RESERVATION_QUOTA_STATUS_REQUEST) {

        return {
            ...state,
            quotaStatusInProgress : true, 
            quotaStatusCompleted : false
        }    
    }

    if (action.type == $.GET_RESERVATION_QUOTA_STATUS_SUCCESS) {

        let {totalReservationCount, reservationQuota} = action.payload;

        return {
            ...state,
            quotaStatusInProgress : false, 
            quotaStatusCompleted : true,
            totalReservationCount, 
            reservationQuota
        }
    }

    return state;
}
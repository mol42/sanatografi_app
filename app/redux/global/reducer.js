import * as $ from "../actionTypes";

const initialState = {
    testData : "SANATOGRAFİ"
};

export default (state = initialState, action) => {

    if (action.type == $.SET_TEST_SUCCESS) {
        return {
            ...state,
            testData : action.payload
        }
    }

    if (action.type == $.GET_TEST_SUCCESS) {
        return {
            ...state,
            testData : action.payload
        }
    }


    return state;
}
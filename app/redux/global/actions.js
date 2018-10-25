import * as $ from "../actionTypes";

export function setTest(testData) {
    return {
        type: $.SET_TEST_REQUEST,
        payload : {testData}
    }
}

export function getTest(testData) {
    return {
        type: $.GET_TEST_REQUEST,
        payload : {testData}
    }
}
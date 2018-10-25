import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';

import authReducer from "./auth/reducer";
import globalReducer from "./global/reducer";
import projectReducer from "./project/reducer";
import reservationReducer from "./reservation/reducer";


import sanatografiSaga from "./saga/sanatografiSaga";

const combinedReducer = combineReducers({
    global : globalReducer,
    auth : authReducer,
    project : projectReducer,
    reservation : reservationReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combinedReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sanatografiSaga);

export default store;
import React from 'react'

import store from "./configureStore";

export default class BaseReduxComponent extends React.Component{

    constructor(props) {
        super(props);
    }

    dispatchAction(action) {
        store.dispatch(action);
    }

    dispatchActionWithType(type, payload) {
        this.dispatchAction({
            type, payload
        })
    }
}
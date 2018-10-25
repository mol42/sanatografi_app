import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import BaseScreen from "../BaseScreen";

export default class CategoryCard extends BaseScreen {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={styles.view}>
                <Text style={styles.text}>{this.props.name}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        paddingTop: 30
    },
    text: {
        fontSize : 35,
        color: 'white',
        fontFamily: "OpenSansCondensed-Bold"
    }
});
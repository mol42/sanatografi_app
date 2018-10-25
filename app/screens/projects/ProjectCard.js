import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    StyleSheet
} from 'react-native';
import BaseScreen from "../BaseScreen";

const {width, height} = Dimensions.get("window");
const itemWidth = width - 60;

export default class ProjectCard extends BaseScreen {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.mainView}>
                <TouchableOpacity onPress={this.props.onPress} style={styles.touchableView}>
                    <Image
                        style={styles.image}
                        source={{uri: this.props.frontPicture}}
                    />
                    <Text style={styles.boldText}>{this.props.name}</Text>
                    <Text style={styles.lightText}>{this.props.shortDescription}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        paddingTop: 20,
        alignItems: 'center'
    },
    touchableView: {
        width : itemWidth,
        alignItems: 'center'
    },
    image: {
        width: itemWidth,
        height: itemWidth/1.6
    },
    boldText: {
        paddingTop: 5,
        fontSize :20,
        color: 'white',
        fontFamily: "OpenSansCondensed-Bold"
    },
    lightText: {
        paddingLeft: 5,
        paddingRight:5,
        paddingBottom: 5,
        fontSize :18,
        color: 'white',
        fontFamily: "OpenSansCondensed-Light"
    }
});
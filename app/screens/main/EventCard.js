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
import moment from 'moment'
import 'moment/locale/tr';

const {width, height} = Dimensions.get("window");
const itemWidth = width - 40;

export default class EventCard extends BaseScreen {

    render() {
        let event =  this.props.event || {};

        return (
            <View style={styles.mainView}>
                <TouchableOpacity onPress={this.props.onPress} style={styles.touchable}>
                    <Image
                        style={styles.image}
                        source={{uri: this.props.frontPicture}}
                    />
                    <View style={styles.cardView}>
                        {
                            event.dateText == undefined
                            ?
                            null
                            :
                            <View style={styles.dateView}>
                                <Text style={styles.dateText}>{moment(event.dateText).locale('tr').format('DD')}</Text>
                                <Text style={styles.dateText}>{moment(event.dateText).locale('tr').format('MMM')}</Text>
                            </View>
                        }
                        <View style={styles.nameView}>
                            <Text style={styles.nameText}>{this.props.name}</Text>
                            <Text style={styles.locationText}>{event.location}</Text>
                        </View>
                    </View>
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
    touchable: {
        width: itemWidth,
        alignItems: 'center'
    },
    image: {
        width: itemWidth,
        height: itemWidth/1.6
    },
    cardView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF59'
    },
    dateView: {
        flex: 1,
        height: 65,
        justifyContent: 'center',
        borderRightWidth: 2,
        borderColor: 'black'
    },
    dateText: {
        fontSize :20,
        color: '#bebebe',
        fontFamily: "OpenSansCondensed-Bold",
        textAlign: 'center'
    },
    nameView: {
        flex: 4,
        alignItems: 'center'
    },
    nameText: {
        paddingTop: 5,
        fontSize :20,
        color: 'white',
        fontFamily: "OpenSansCondensed-Bold",
        textAlign: 'center'
    },
    locationText: {
        paddingLeft: 5,
        paddingRight:5,
        paddingBottom: 5,
        fontSize :20,
        color: 'white',
        fontFamily: "OpenSansCondensed-Light",
        textAlign: 'center'
    }
});
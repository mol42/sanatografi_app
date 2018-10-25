import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Linking,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import BaseScreen from "../BaseScreen";
import {connect} from "react-redux";
import SanatografiHeader from "../../components/SanatografiHeader";
import call from 'react-native-phone-call'

const args = {
    number: '+905314007699', // Use commas to add time between digits.
    prompt: false
};

class Contact extends BaseScreen {

    static navigatorStyle = {
        navBarHidden: true,
    };

    render() {
        return (
            <ImageBackground source={require('../../assets/images/sanatografi_background.png')} style={styles.background}>
                <SafeAreaView style={styles.safeArea}>
                    <SanatografiHeader
                        backButton={true}
                        onPress={this._onPressMenu}/>
                    <View style={styles.mainView}>
                        <View style={styles.subHeader}>
                            <Text style={styles.textBold}>İletişim</Text>
                        </View>
                        <TouchableOpacity onPress={this._onPressCall}>
                            <Text style={styles.textLight}>Tel: 0531 400 76 99</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._onPressEmail}>
                            <Text style={styles.textLight}>E-Posta: iletisim@sanatografi.com</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        );
    }

    _onPressMenu = () => {
        this.popPreviousInScreenStack();
    };

    _onPressCall = () => {
        call(args).catch(console.error)
    };

    _onPressEmail = () => {
        Linking.openURL('mailto:iletisim@sanatografi.com')
    }
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%'
    },
    safeArea: {
        flex: 1
    },
    mainView: {
        paddingTop: 40,
        alignItems: 'center'
    },
    subHeader: {
        borderBottomWidth: 4,
        borderColor:'red',
        justifyContent: 'flex-start',
        marginBottom: 40
    },
    textBold: {
        fontSize : 30,
        color: 'white',
        fontFamily: "OpenSansCondensed-Bold"
    },
    textLight: {
        fontSize : 25,
        color: 'white',
        fontFamily: "OpenSansCondensed-Light",
        paddingTop: 10
    }
});

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps)(Contact);

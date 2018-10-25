import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity, Alert, StyleSheet, SafeAreaView
} from 'react-native';
import BaseScreen from "../BaseScreen";
import {connect} from "react-redux";
import SanatografiHeader from "../../components/SanatografiHeader";

class ResetSuccessScreen extends BaseScreen {

    static navigatorStyle = {
        navBarHidden: true,
    };

    constructor(props, force){
        super(props);
    }

    render() {
        return (
            <ImageBackground source={require('../../assets/images/sanatografi_background.png')} style={styles.background}>
                <SafeAreaView style={styles.safeArea}>
                    <SanatografiHeader
                        onPress={this._onPressMenu}/>
                    <View style={styles.mainView}>
                        <View>
                            <Text style={styles.messageText}>Şifreniz başarı ile değiştirilmiştir.</Text>
                        </View>
                        <View>
                            <TouchableOpacity  onPress={this._onPressLogin} style={styles.button}>
                                <Text style={styles.buttonText}>Giriş Yap</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        );
    }

    _onPressMenu = () => {
        this.openDrawer();
    };

    _onCodeChanged = (code) => {
        this.setState({
            code
        })
    };

    _onPasswordChanged = (password) => {
        this.setState({
            password
        })
    };

    _onPassword2Changed = (password2) => {
        this.setState({
            password2
        })
    };

    _onPressLogin = () => {
        this.pushToActiveScreenStack(this.getScreenMap().Login);
    };
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
        flex:1,
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    messageText: {
        alignItems: 'center',
        fontSize : 24,
        fontFamily: "OpenSansCondensed-Bold",
        color : "white"
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: 300,
        height: 70,
        borderRadius: 5,
        marginBottom: 40
    },
    buttonText: {
        alignItems: 'center',
        fontSize :30,
        fontFamily: "OpenSansCondensed-Bold"
    }
});

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps)(ResetSuccessScreen);
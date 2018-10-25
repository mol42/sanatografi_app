import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    KeyboardAvoidingView,
    Dimensions,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import BaseScreen from "../BaseScreen";
import {connect} from "react-redux";
import SanatografiHeader from "../../components/SanatografiHeader";
import { Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {resetPasswordResetState, requestResetPassword} from "../../redux/auth/actions";

const {width, height} = Dimensions.get("window");
const itemWidth = width - 60;

class ForgotPassword extends BaseScreen {

    static navigatorStyle = {
        navBarHidden: true,
    };

    constructor(props, force){
        super(props);
    }

    willAppear() {
        this.dispatchAction(resetPasswordResetState());
    }

    render() {
        return (
            <ImageBackground source={require('../../assets/images/sanatografi_background.png')} style={styles.background}>
                <SafeAreaView style={styles.safeArea}>
                    <SanatografiHeader
                        backButton={true}
                        onPress={this._onPressMenu}/>
                    <View style={styles.mainView}>
                        <KeyboardAvoidingView behavior="position" enabled
                                              keyboardVerticalOffset={60}>
                            <Icon
                                name='lock'
                                type='FontAwesome'
                                color= '#bebebe'
                                underlayColor= "transparent"
                                size={50}
                                style={styles.icon}
                            />
                            <View style={styles.inputView}>
                                <Text style={styles.noteText}>Şifrenizi sıfırlamak için email adresinizi girin.</Text>
                                <Item style={styles.inputItem}>
                                    <Input
                                        placeholder="Email"
                                        style={styles.input}
                                        autoCapitalize={"none"}
                                        onChangeText={this._onEmailChanged}
                                    />
                                </Item>
                            </View>
                        </KeyboardAvoidingView>
                        <View>
                            <TouchableOpacity  onPress={this._onPressSend} style={styles.button}>
                                <Text style={styles.buttonText}>Gönder</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        );
    }

    _onPressMenu = () => {
        // this.openDrawer();
        this.popPreviousInScreenStack();
    };

    _onEmailChanged = (email) => {
        this.setState({
            email
        })
    };

    _onPressSend = () => {
        let resetData = {
            email : this.state.email,
        };
        this.dispatchAction(requestResetPassword(resetData));
        this.pushToActiveScreenStack(this.getScreenMap().ResetScreen, resetData);
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
    icon: {
        alignSelf: 'center',
        paddingTop: 10
    },
    inputView: {
        justifyContent: 'center',
        alignItems : "center",
        paddingTop: 80
    },
    noteText: {
        fontSize : 24,
        color: '#bebebe',
        fontFamily: "OpenSansCondensed-Bold",
        paddingLeft:10,
        paddingRight: 10,
        textAlign: 'center'
    },
    inputItem: {
        width : itemWidth,
        marginBottom:10,
        paddingTop: 50,
        justifyContent : "center"
    },
    input: {
        marginLeft: 10,
        marginRight : 10,
        fontSize : 24,
        color: 'white',
        fontFamily: "OpenSansCondensed-Bold"
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

export default connect(mapStateToProps)(ForgotPassword);

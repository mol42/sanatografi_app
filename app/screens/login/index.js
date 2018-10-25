import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet
} from 'react-native';
import BaseScreen from "../BaseScreen";
import {connect} from "react-redux";
import SanatografiHeader from "../../components/SanatografiHeader";
import { Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {doLogin, resetSignup, resetLoginState} from "../../redux/auth/actions";

class Login extends BaseScreen {

    static navigatorStyle = {
        navBarHidden: true,
    };

    constructor(props, force){
        super(props);
        
        this.state = {
            email: "",
            password: ""
        };
    }

    willAppear() {
        this.dispatchAction(resetLoginState());
    }

    componentWillReceiveProps(nextProps) {
        let {loginError, loginSuccess} = nextProps.auth;
        let {loginError : prevLoginError, loginSuccess : prevLoginSuccess} = this.props.auth;

        if (prevLoginError != loginError && loginError) {
            Alert.alert(
                'Email veya şifre hatalı.',
                '',
                [
                    {text: 'Tamam', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            );
        }

        if (prevLoginSuccess != loginSuccess && loginSuccess) {
            
            let {targetScreen, extraData} = this.getNavProps();

            if (targetScreen) {
                this.pushToActiveScreenStack(targetScreen, extraData);
            } else {
                this.pushToActiveScreenStack(this.getScreenMap().MainScreen);
            }
        }
    }

    render() {
        // let loginFailData = this.props.auth.loginError || {};

        return (
            <ImageBackground source={require('../../assets/images/sanatografi_background.png')} style={styles.background}>
                <SafeAreaView style={styles.safeArea}>
                    <SanatografiHeader
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
                                <Item style={styles.inputItem}>
                                    <Input
                                        placeholder="Email"
                                        style={styles.input}
                                        autoCapitalize={"none"}
                                        onChangeText={this._onEmailChanged}
                                    />
                                </Item>
                                <Item>
                                    <Input
                                        placeholder="Şifre"
                                        style={styles.input}
                                        autoCapitalize={"none"}
                                        secureTextEntry={true}
                                        onChangeText={this._onPasswordChanged}
                                    />
                                </Item>
                                <TouchableOpacity onPress={this._onPressForgotPass} style={styles.forgotPass}>
                                    <Text style={styles.touchableText}>Şifrenizi mi unuttunuz?</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                        <View>
                            <TouchableOpacity onPress={this._onPressSignUp} style={styles.signUp}>
                                <Text style={styles.touchableText}>Yeni hesap oluşturmak için tıklayınız.</Text>
                            </TouchableOpacity>
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

    _onEmailChanged = (email) => {
        this.setState({
            email
        })
    };

    _onPasswordChanged = (password) => {
        this.setState({
            password
        })
    };

    _onPressSignUp = () => {
        this.dispatchAction(resetSignup());
        this.pushToActiveScreenStack(this.getScreenMap().SignUp)
    };

    _onPressForgotPass = () => {
        this.pushToActiveScreenStack(this.getScreenMap().ForgotPassword)
    };

    _onPressLogin = () => {
        let loginData ={
            email : this.state.email,
            hashedPassword : this.state.password,
        };
        this.dispatchAction(doLogin(loginData));
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
        justifyContent: 'flex-start',
        paddingTop: 80
    },
    inputItem: {
        width:300,
        marginBottom:10
    },
    input: {
        fontSize : 24,
        color: 'white',
        fontFamily: "OpenSansCondensed-Bold"
    },
    touchableText: {
        fontSize : 20,
        color: 'white',
        fontFamily: "OpenSansCondensed-Light"
    },
    forgotPass: {
        paddingTop: 20,
        paddingLeft: 7
    },
    signUp: {
        alignItems: 'center',
        paddingBottom: 40
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
        auth: state.auth
    };
}

export default connect(mapStateToProps)(Login);

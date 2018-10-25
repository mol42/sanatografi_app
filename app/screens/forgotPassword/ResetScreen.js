import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Alert,
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
import {resetPassword} from "../../redux/auth/actions";

const {width, height} = Dimensions.get("window");
const itemWidth = width - 60;

class ResetScreen extends BaseScreen {

    static navigatorStyle = {
        navBarHidden: true,
    };

    constructor(props, force){
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        let {
            updatePasswordCompleted,
            updatePasswordSuccess
        } = nextProps.auth;
        let {
            updatePasswordCompleted : prevUpdatePasswordCompleted,
            updatePasswordSuccess : prevUpdatePasswordSuccess
        } = this.props.auth;

        if (prevUpdatePasswordCompleted != updatePasswordCompleted && prevUpdatePasswordSuccess != updatePasswordSuccess) {
            if (updatePasswordSuccess) {
                this.pushToActiveScreenStack(this.getScreenMap().ResetSuccessScreen);
            }
        }
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
                                <Text style={styles.noteText}>Email adresinize gelen sıfırlama kodunu girin.</Text>
                                <Item style={styles.inputTopItem}>
                                    <Input
                                        placeholder="Sıfırlama Kodu"
                                        autoCapitalize={"none"}
                                        style={styles.input}
                                        onChangeText={this._onCodeChanged}
                                    />
                                </Item>
                                <Item style={styles.inputItem}>
                                    <Input
                                        placeholder="Yeni Şifre"
                                        style={styles.input}
                                        autoCapitalize={"none"}
                                        secureTextEntry={true}
                                        onChangeText={this._onPasswordChanged}
                                    />
                                </Item>
                                <Item style={styles.inputItem}>
                                    <Input
                                        placeholder="Yeni Şifre(Tekrar)"
                                        style={styles.input}
                                        autoCapitalize={"none"}
                                        secureTextEntry={true}
                                        onChangeText={this._onPassword2Changed}
                                    />
                                </Item>
                            </View>
                        </KeyboardAvoidingView>
                        <View>
                            <TouchableOpacity  onPress={this._onPressSend} style={styles.button}>
                                <Text style={styles.buttonText}>Şifremi Değiştir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        );
    }

    _onPressMenu = () => {
        this.popPreviousInScreenStack();
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

    _onPressSend = () => {
        let {email} = this.getNavProps();
        let {password, password2} = this.state;
        let resetData = {
            email,
            code : this.state.code,
            password : this.state.password
        };

        if (password == password2) {
            this.dispatchAction(resetPassword(resetData));
        }

        if (password !== password2) {
            Alert.alert(
                'Şifreleriniz uyuşmuyor. Lütfen tekrar deneyiniz.',
                '',
                [
                    {text: 'Tamam', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            );
        }
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
    inputTopItem: {
        width:itemWidth,
        paddingTop: 50
    },
    inputItem: {
        width:itemWidth
    },
    input: {
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
        auth : state.auth
    };
}

export default connect(mapStateToProps)(ResetScreen);
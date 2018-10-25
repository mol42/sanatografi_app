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
import {doSignUp} from "../../redux/auth/actions";


class SignUp extends BaseScreen {

    static navigatorStyle = {
        navBarHidden: true,
    };

    state = {
        name : "",
        lastName : "",
        phone : "",
        email : "",
        password : "",
        password2 : "",
        salt: "1",
        status: "1"
    }

    render() {
        let {signUpCompleted} = this.props.auth;

        return (
            <ImageBackground source={require('../../assets/images/sanatografi_background.png')} style={styles.background}>
                <SafeAreaView style={styles.safeArea}>
                    <SanatografiHeader
                        backButton={true}
                        onPress={this._onPressMenu}/>
                    {
                        signUpCompleted
                        ?
                        <View style={styles.mainView}>
                            <View style={styles.noteView}>
                                <Text style={styles.noteTextBold}>Tebrikler !</Text>
                                <Text>&nbsp;</Text>
                                <Text style={styles.noteTextLight}>Aktivasyon onay mailiniz email adresinize gönderilmiştir, gelen linke tıklayarak üyeliğinizi başlatabilir ve Sanatografi dünyasına adım atabilirsiniz</Text>
                            </View>
                            <View>
                                <TouchableOpacity  onPress={this._onPressMainScreen} style={styles.button}>
                                    <Text style={styles.buttonText}>Ana Sayfa</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        <View style={styles.mainView}>
                            <KeyboardAvoidingView behavior="position" enabled
                                                  keyboardVerticalOffset={60}>
                                <Icon
                                    name='book'
                                    type='FontAwesome'
                                    color= '#bebebe'
                                    underlayColor= "transparent"
                                    size={50}
                                    style={styles.icon}
                                />
                                <View style={styles.inputView}>
                                    <Item style={styles.item}>
                                        <Input
                                            placeholder="Ad"
                                            style={styles.inputText}
                                            onChangeText={this._onNameChanged}
                                        />
                                    </Item>
                                    <Item>
                                        <Input
                                            placeholder="Soyad"
                                            style={styles.inputText}
                                            onChangeText={this._onLastNameChanged}
                                        />
                                    </Item>
                                    <Item>
                                        <Input
                                            placeholder="Telefon No"
                                            style={styles.inputText}
                                            onChangeText={this._onPhoneChanged}
                                        />
                                    </Item>
                                    <Item>
                                        <Input
                                            placeholder="Email"
                                            style={styles.inputText}
                                            autoCapitalize={"none"}
                                            onChangeText={this._onEmailChanged}
                                        />
                                    </Item>
                                    <Item>
                                        <Input
                                            placeholder="Şifre"
                                            style={styles.inputText}
                                            autoCapitalize={"none"}
                                            secureTextEntry={true}
                                            onChangeText={this._onPasswordChanged}
                                        />
                                    </Item>
                                    <Item>
                                        <Input
                                            placeholder="Şifre(Tekrar)"
                                            style={styles.inputText}
                                            autoCapitalize={"none"}
                                            secureTextEntry={true}
                                            onChangeText={this._onPassword2Changed}
                                        />
                                    </Item>
                                </View>
                            </KeyboardAvoidingView>
                            <View>
                                <TouchableOpacity  onPress={this._onPressSignUp} style={styles.button}>
                                    <Text style={styles.buttonText}>Kayıt Ol</Text>
                                </TouchableOpacity>
                            </View>                            
                        </View>
                }
                </SafeAreaView>
            </ImageBackground>
        );
    }

    _onNameChanged = (name) => {
        this.setState({
            name
        })
    };

    _onLastNameChanged = (lastName) => {
        this.setState({
            lastName
        })
    };

    _onPhoneChanged = (phone) => {
        this.setState({
            phone
        })
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

    _onPassword2Changed = (password2) => {
        this.setState({
            password2
        })
    };

    _onPressSignUp = () => {
        let {name, lastName, phone, email, password, password2} = this.state;
        let userData = {
            name,
            lastName,
            phone,
            email,
            hashedPassword: password
        };
        if (password == password2) {
            this.dispatchAction(doSignUp(userData));
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

    _onPressMenu = () => {
        this.popPreviousInScreenStack();
    };

    _onPressMainScreen = () => {
        // this.startNewScreenStack(this.getScreenMap().MainScreen);
        this.pushToActiveScreenStack(this.getScreenMap().MainScreen);
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
        flex:1,
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    noteView: {
        paddingLeft : 20,
        paddingRight : 20
    },
    noteTextBold: {
        alignItems: 'center',
        fontSize : 20,
        color : "white",
        fontFamily: "OpenSansCondensed-Bold"
    },
    noteTextLight: {
        alignItems: 'center',
        fontSize : 20,
        color : "white",
        fontFamily: "OpenSansCondensed-Light"
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
    },
    icon: {
        alignSelf: 'center',
        paddingTop: 10
    },
    inputView: {
        justifyContent: 'flex-start',
        paddingTop: 15
    },
    item: {
        width:300
    },
    inputText: {
        fontSize : 24,
        color: 'white',
        fontFamily: "OpenSansCondensed-Bold"
    }
});

function mapStateToProps(state) {
    return {
        auth : state.auth
    };
}

export default connect(mapStateToProps)(SignUp);
import React, { Component } from 'react';
import {
    Text,
    ImageBackground,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux'
import BaseScreen from "../BaseScreen";
import {SCREENS_MAP} from "../index";
import Icon from 'react-native-vector-icons/FontAwesome';

class Sidebar extends BaseScreen {

    render() {
        let {loginData} = this.props.auth || {};

        return (
            <ImageBackground source={require('../../assets/images/sanatografi_background.png')} style={styles.background}>
                <TouchableOpacity onPress={this._onPressMainScreen} style={styles.mainButtons}>
                    <Text style={styles.mainText}>ANA SAYFA</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._onPressProjectCategories} style={styles.mainButtons}>
                    <Text style={styles.mainText}>PROJELER</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._onPressMMO("MMO", 5)} style={styles.mainButtons}>
                    <Text style={styles.mainText}>MMO</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._onPressMMOC("MMO Çocuk", 6)} style={styles.mainButtons}>
                    <Text style={styles.mainText}>MMO ÇOCUK</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={this._onPressContact} style={styles.mainButtons}>
                    <Text style={styles.mainText}>İLETİŞİM</Text>
                </TouchableOpacity>
                {
                    loginData && loginData.xAuthToken
                    ?
                    <TouchableOpacity onPress={this._onPressMyAccount} style={styles.accountButton}>
                        <Icon
                            name='user'
                            type='FontAwesome'
                            color= '#bebebe'
                            underlayColor= "transparent"
                            size={28}
                        />
                        <Text style={styles.accountText}>HESABIM</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={this._onPressSignIn} style={styles.accountButton}>
                        <Icon
                            name='lock'
                            type='FontAwesome'
                            color= '#bebebe'
                            underlayColor= "transparent"
                            size={28}
                        />
                        <Text style={styles.accountText}>GİRİŞ YAP</Text>
                    </TouchableOpacity>
                }
                
            </ImageBackground>
        );
    }

    _onPressSignIn = () => {
        this.closeDrawer();
        this.props.navigator.handleDeepLink({
            link: SCREENS_MAP.Login.id,
            payload: '' // (optional) Extra payload with deep link
        });
    };

    _onPressMyAccount = () => {
        this.closeDrawer();
        this.props.navigator.handleDeepLink({
            link: SCREENS_MAP.MyAccount.id,
            payload: '' // (optional) Extra payload with deep link
        });
    };

    _onPressMainScreen = () => {
        this.closeDrawer();
        this.props.navigator.handleDeepLink({
            link: SCREENS_MAP.MainScreen.id,
            payload: '' // (optional) Extra payload with deep link
        });
    };
    
    _onPressProjectCategories = () => {
        this.closeDrawer();
        this.props.navigator.handleDeepLink({
            link: SCREENS_MAP.ProjectCategories.id,
            payload: '' // (optional) Extra payload with deep link
        });
    };

    _onPressMMO = (categoryName, categoryId) => {
        this.closeDrawer();
        this.props.navigator.handleDeepLink({
            link: SCREENS_MAP.MMO.id,
            payload: {categoryName, categoryId}// (optional) Extra payload with deep link
        });
    };
    
    _onPressMMOC = (categoryName, categoryId) => {
        this.closeDrawer();
        this.props.navigator.handleDeepLink({
            link: SCREENS_MAP.MMOC.id,
            payload: {categoryName, categoryId} // (optional) Extra payload with deep link
        });
    };

    _onPressContact = () => {
        this.closeDrawer();
        this.props.navigator.handleDeepLink({
            link: SCREENS_MAP.Contact.id,
            payload: '' // (optional) Extra payload with deep link
        });
    }
}

const styles = StyleSheet.create({
    background: {
        flex:1,
        width: '100%',
        height: '100%',
        justifyContent: "center"
    },
    mainButtons: {
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft:30
    },
    mainText: {
        fontSize : 30,
        color: 'white',
        fontFamily: "OpenSansCondensed-Bold"
    },
    accountButton: {
        paddingTop: 25,
        paddingLeft:30,
        flexDirection : "row",
        alignItems : "center"
    },
    accountText:{
        marginLeft : 10,
        fontSize : 28,
        color: 'white',
        fontFamily: "OpenSansCondensed-Light"
    }
});

function mapStateToProps(state) {
    return {
        auth : state.auth
    };
}

export default connect(mapStateToProps)(Sidebar);
import React, { Component } from 'react';
import {View, Text, ScrollView, ImageBackground, StatusBar, Platform, StyleSheet, SafeAreaView} from "react-native";
import {connect} from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import BaseScreen from "../BaseScreen";
import SanatografiHeader from "../../components/SanatografiHeader";
import {getFeaturedProjects, getProjects} from "../../redux/project/actions";
import EventCard from "../main/EventCard";

const isAndroid = Platform.OS == "android";

class MainScreen extends BaseScreen {

    static navigatorStyle = {
        navBarHidden: true,
    };

    constructor(props) {
        super(props, true);
    }

    willAppear() {
        isAndroid && SplashScreen.hide();
        this.dispatchAction(getFeaturedProjects());
        this.dispatchAction(getProjects());
    }

    render() {
        let {featuredProjects} = this.props.project  || [];

        featuredProjects.sort(function (a, b) {
            return a.orderNumber - b.orderNumber;
        });

        return (
            <ImageBackground source={require('../../assets/images/sanatografi_background.png')} style={styles.background}>
                <StatusBar
                    barStyle="light-content"
                />
                <SafeAreaView style={styles.safeArea}>
                    <SanatografiHeader
                        onPress={this._onPressMenu}/>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.mainView}>
                            <View style={styles.subHeader}>
                                <Text style={styles.subHeaderText}>ETKİNLİKLER</Text>
                            </View>
                            {
                                featuredProjects.map((activeItem) => {
                                    let recentEvent = activeItem.project.event;
                                    let activeEvent = recentEvent.find ( activeEvent => activeEvent.status == 1 );
                                    if (activeEvent == undefined) {
                                        return <EventCard
                                            key={activeItem.id}
                                            activeItem={activeItem}
                                            name={activeItem.project.name}
                                            shortDescription={activeItem.project.shortDescription}
                                            frontPicture={activeItem.project.frontPicture}
                                            event={activeEvent}
                                            onPress={() => this._onPress(activeItem.project)}
                                        />
                                    }
                                    else {
                                        return <EventCard
                                            key={activeItem.id}
                                            activeItem={activeItem}
                                            name={activeItem.project.name}
                                            shortDescription={activeItem.project.shortDescription}
                                            frontPicture={activeItem.project.frontPicture}
                                            event={activeEvent}
                                            onPress={() => this._onPressReservation(activeEvent, activeItem.project)}
                                        />

                                    }
                                })
                            }
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        );
    }

    _onPressMenu = () => {
        this.openDrawer();
    };

    _onPressReservation = (eventData, activeItem) => {
        this.pushToActiveScreenStack(this.getScreenMap().Event, {eventData, activeItem})
    };

    _onPress = (activeItem) => {
        this.pushToActiveScreenStack(this.getScreenMap().ProjectDetail, {activeItem})
    }
}
function mapStateToProps(state) {
    return {
        project : state.project,
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
    scrollView: {
        flex: 1
    },
    mainView: {
        flex:1,
        alignItems: 'center'
    },
    subHeader: {
        borderBottomWidth: 4,
        borderColor:'red',
        justifyContent: 'flex-start'
    },
    subHeaderText: {
        fontSize : 30,
        color: 'white',
        fontFamily: "OpenSansCondensed-Bold"
    }
});

export default connect(mapStateToProps)(MainScreen);

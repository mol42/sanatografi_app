import React, { Component } from 'react';
import {View, Text, ScrollView, TouchableOpacity, ImageBackground, Image, SafeAreaView, StyleSheet} from "react-native";
import {connect} from 'react-redux';
import BaseScreen from "../BaseScreen";
import SanatografiHeader from "../../components/SanatografiHeader";
import {getFeaturedProjects, getProjects, getEvents} from "../../redux/project/actions";
import {getReservation} from "../../redux/reservation/actions";
import moment from "moment/moment";

class MyAccountScreen extends BaseScreen {

    static navigatorStyle = {
        navBarHidden: true,
    };

    constructor(props, force) {
        super(props);
    }

    willAppear() {
        let auth = this.props.auth.loginData || {};
        let userData ={
            sessionUser : auth.user.id,
        };
        this.dispatchAction(getEvents());
        this.dispatchAction(getReservation(userData));

    }

    render() {
        let auth = this.props.auth.loginData || {};
        let projects = this.props.project.projects || [];
        let events = this.props.project.events || [];
        let reservations = this.props.reservation.reservations || [];

        return (
            <ImageBackground source={require('../../assets/images/sanatografi_background.png')} style={styles.background}>
                <SafeAreaView style={styles.safeArea}>
                    <SanatografiHeader
                        backButton={true}
                        onPress={this._onPressMenu}/>
                    <View style={styles.infoView}>
                        <View style={styles.subHeader}>
                            <Text style={styles.subHeaderText}>Hesabım</Text>
                        </View>
                        <Text style={styles.infoText}>{auth.user.name} {auth.user.lastName}</Text>
                        <Text style={styles.infoText}>{auth.user.email}</Text>
                        <Text style={styles.infoText}>{auth.user.phone}</Text>
                        <View style={styles.resHeader}>
                            <Text style={styles.subHeaderText}>Rezervasyonlarım</Text>
                        </View>
                    </View>
                    <ScrollView style={styles.resScroll}>
                        {
                            reservations.map((activeItem) => {
                                let project = projects.find ( project => project.id == activeItem.projectId );
                                let event = events.find ( event => event.id == activeItem.eventId );

                                if (!project || !event || event.status !== 1) {
                                    return null;
                                }

                                return (
                                    <View style={styles.resCard}>
                                        <Text style={styles.resName}>{project.name}</Text>
                                        <Text style={styles.boldText}>{moment(event.date).locale('tr').format('DD MMMM YYYY')}</Text>
                                        <Text style={styles.lightText}>{moment(event.date).format('dddd HH:mm')}</Text>
                                        <Text style={styles.boldText}>{event.location}</Text>
                                        <Text style={styles.lightText}>{activeItem.guestCount} Kişi</Text>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        );
    }

    _onPressMenu = () => {
        this.popPreviousInScreenStack();
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
    infoView: {
        paddingTop: 20,
        alignItems: 'center'
    },
    subHeader: {
        borderBottomWidth: 4,
        borderColor:'red',
        justifyContent: 'flex-start',
        marginBottom: 10
    },
    subHeaderText: {
        fontSize : 30,
        color: 'white',
        fontFamily: "OpenSansCondensed-Bold"
    },
    infoText: {
        fontSize : 25,
        color: 'white',
        fontFamily: "OpenSansCondensed-Light",
        paddingTop: 10
    },
    resHeader: {
        borderBottomWidth: 4,
        borderColor:'red',
        justifyContent: 'flex-start',
        paddingTop: 20,
        marginBottom: 20
    },
    resScroll: {
        flex:1,
        alignSelf: 'center'
    },
    resCard: {
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 5,
        width: 250,
        borderRadius: 5,
        paddingTop:5,
        paddingBottom:5
    },
    resName: {
        fontSize :22,
        fontFamily: "OpenSansCondensed-Bold"
    },
    boldText: {
        fontSize :18,
        fontFamily: "OpenSansCondensed-Bold"
    },
    lightText: {
        fontSize :18,
        fontFamily: "OpenSansCondensed-Light"
    }
});

function mapStateToProps(state) {
    return {
        project : state.project,
        auth: state.auth,
        reservation: state.reservation
    };
}

export default connect(mapStateToProps)(MyAccountScreen);

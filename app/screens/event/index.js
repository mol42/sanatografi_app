import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    Alert,
    Dimensions,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import BaseScreen from "../BaseScreen";
import {connect} from "react-redux";
import SanatografiHeader from "../../components/SanatografiHeader";
import moment from "moment/moment";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from "native-base";
import {doReservation, resetReservationState, fetchReservationQuotaStatus} from "../../redux/reservation/actions";

const {width, height} = Dimensions.get("window");
const itemWidth = width - 60;

class Event extends BaseScreen {

    static navigatorStyle = {
        navBarHidden: true,
    };

    constructor(props) {
        super(props);
        this.state = {
            eventData: {},
            selected: "1"
        };
    }

    willAppear() {
        let {eventData} = this.getNavProps();
        this.dispatchAction(resetReservationState());
        this.dispatchAction(fetchReservationQuotaStatus(eventData.id));
    }

    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

    render() {
        let {eventData, activeItem} = this.getNavProps();
        let {reservationCompleted, reservationResult} = this.props.reservation;

        return (
            <ImageBackground source={require('../../assets/images/sanatografi_background.png')} style={styles.background}>
                <SafeAreaView style={styles.safeArea}>
                    <SanatografiHeader
                        backButton={true}
                        onPress={this._onPressMenu}/>
                    <View style={styles.mainView}>

                        <View style={styles.innerView}>

                            <View style={styles.subHeaderView}>
                                <Text style={styles.subHeaderText}>{activeItem.name}</Text>
                            </View>

                            <View style={styles.topRowView}>
                                <View style={styles.iconView}>
                                    <Icon
                                        name='calendar'
                                        type='FontAwesome'
                                        color= '#bebebe'
                                        underlayColor= "transparent"
                                        size={24}
                                    />
                                </View>
                                <View style={styles.dateView}>
                                    <Text style={styles.boldText}>{moment(eventData.dateText).locale('tr').format('DD MMMM YYYY')}</Text>
                                    <Text style={styles.boldText}>{moment(eventData.dateText).locale('tr').format('dddd')}</Text>
                                </View>
                            </View>

                            <View style={styles.rowView}>
                                <View style={styles.iconView}>
                                    <Icon
                                        name='clock-o'
                                        type='FontAwesome'
                                        color= '#bebebe'
                                        underlayColor= "transparent"
                                        size={24}
                                    />
                                </View>
                                <View style={styles.timeView}>
                                    <Text style={styles.boldText}>{moment(eventData.dateText).format('HH:mm')}</Text>
                                </View>
                            </View>

                            <View style={styles.rowView}>
                                <View style={styles.iconView}>
                                    <Icon
                                        name='map-pin'
                                        type='FontAwesome'
                                        color= '#bebebe'
                                        underlayColor= "transparent"
                                        size={24}
                                    />
                                </View>
                                <View style={styles.locationView}>
                                    <Text style={styles.boldText}>{eventData.location}</Text>
                                </View>
                            </View>

                            <View style={styles.noteView}>
                                <ScrollView style={styles.noteScrollView}>
                                    <Text style={styles.noteText}>{eventData.note}</Text>
                                </ScrollView>
                            </View>
                        </View>
                        {
                            reservationCompleted
                            ?
                            this._renderReservationResult(reservationResult)
                            :
                            this._renderReservationSection(eventData)
                        }
                    </View>
                </SafeAreaView>
            </ImageBackground>
        );
    }

    _renderReservationSection = (eventData) => {
        let {quotaStatusInProgress, quotaStatusCompleted, totalReservationCount, reservationQuota} = this.props.reservation;
        let availableSeats = reservationQuota-totalReservationCount;
        let max = eventData.max;

        if (quotaStatusInProgress || !quotaStatusCompleted) {
            return <View style={styles.iconView}>
                        <Icon
                            name={"spinner"}
                            type='ionicon'
                            color= 'white'
                            underlayColor= "transparent"
                            size={30}
                        />
                    </View>
        }

        if (totalReservationCount == 0 && reservationQuota == 0) {
            return null;
        }

        if (totalReservationCount < reservationQuota && availableSeats <= max) {

            return this._renderLastReservations(availableSeats)

        }
        if (totalReservationCount < reservationQuota && availableSeats > max) {

            return this._renderNormalReservations(max)

        }
        else {

            return this._renderReservationResult({message : "Tüm biletlerimiz tükenmiştir. İlginiz için çok teşekkürler...", success : false});
        }
    };


    _renderLastReservations = (availableSeats) => {
        let selectable = availableSeats;
        let guest =  [...Array(selectable).keys()].map(x => ++x);
        return (
            <View style={styles.lastReservationView}>
                <View style={styles.reservationInnerView}>
                    <Text style={styles.warningText}> Son {selectable} koltuk. </Text>
                    <View style={styles.pickerView}>
                        <Text style={styles.lightText}>Kişi sayısı seçiniz:</Text>
                        <Picker
                            note
                            mode="dropdown"
                            style={styles.picker}
                            selectedValue={this.state.selected}
                            iosIcon={<Icon name="chevron-down" style={{color: 'white'}}/>}
                            onValueChange={this.onValueChange.bind(this)}
                            itemTextStyle={styles.itemText}
                            textStyle={styles.boldText}
                        >
                            {
                                guest.map((activeItem) => {
                                    let number = activeItem.toString();
                                    return (
                                        <Picker.Item key={"opt-" + number} label = {number + " Kişi"} value={number} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity  onPress={this._onPressReservation} style={styles.button}>
                        <Text style={styles.buttonText}>Rezervasyon Yap</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    _renderNormalReservations = (max) => {
        
        let selectable = max;
        
        return (
            <View style={styles.reservationView}>
                <View style={styles.reservationInnerView}>
                    <View style={styles.pickerView}>
                        <Text style={styles.lightText}>Kişi sayısı seçiniz:</Text>
                        <Picker
                            note
                            mode="dropdown"
                            style={styles.picker}
                            selectedValue={this.state.selected}
                            iosIcon={<Icon name="chevron-down" style={{color: 'white'}}/>}
                            onValueChange={this.onValueChange.bind(this)}
                            itemTextStyle={styles.itemText}
                            textStyle={styles.boldText}
                        >
                            {
                                this._renderPickerItems(selectable)
                            }
                        </Picker>
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity  onPress={this._onPressReservation} style={styles.button}>
                        <Text style={styles.buttonText}>Rezervasyon Yap</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    _renderPickerItems = (selectable) => {
        const pickerItems = [];

        for (let number = 1; number < selectable; number++) {
            pickerItems.push(<Picker.Item key={"opt-" + number} label={number +" Kişi"} value={number} />)
        }

        return pickerItems;
    }

    _renderReservationResult = ({message, success}) => {
        return (<View style={styles.resultView}>
                    <View style={styles.messageView}>
                        <Text style={[styles.messageText, {color: success ? 'white' : 'yellow'}]}>
                            {message}
                        </Text>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity  onPress={this._onPressMainPage} style={styles.button}>
                            <Text style={styles.buttonText}>Ana Sayfa</Text>
                        </TouchableOpacity>
                    </View>
                </View>)
    };

    _onPressMenu = () => {
        this.popPreviousInScreenStack();
        this.dispatchAction(resetReservationState());

    };

    _onPressMainPage = () => {
        this.pushToActiveScreenStack(this.getScreenMap().MainScreen);
        this.dispatchAction(resetReservationState());
    };

    _onPressReservation = () => {
        let loginData = this.props.auth.loginData || {};
        let {eventData, activeItem} = this.getNavProps();

        let reservationData = {
            eventId : eventData.id,
            guestCount : this.state.selected
        };
        
        if (loginData.xAuthToken == undefined) {
            Alert.alert(
                'Rezervasyon için giriş yapmanız gerekmektedir.',
                '',
                [
                    {text: 'Giriş Yap', onPress: () => this.pushToActiveScreenStack(this.getScreenMap().Login, {extraData : {eventData, activeItem}, targetScreen : this.getScreenMap().Event})},
                    {text: 'Kayıt Ol', onPress: () => this.pushToActiveScreenStack(this.getScreenMap().SignUp)},
                    {text: 'İptal', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            );
        }
        else {
            this.dispatchAction(doReservation(reservationData));
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
    subHeaderText: {
        fontSize : 36,
        fontFamily: "OpenSansCondensed-Bold",
        color: 'white',
        textAlign: 'center'
    },
    subHeaderView:{
        borderBottomWidth : 4,
        borderBottomColor : "red"
    },
    mainView: {
        flex: 1
    },
    innerView: {
        flex : 6,
        alignItems : "center"
    },
    warningText: {
        fontSize : 24,
        fontFamily: "OpenSansCondensed-Bold",
        color: 'yellow'
    },
    boldText: {
        fontSize : 24,
        fontFamily: "OpenSansCondensed-Bold",
        color: 'white'
    },
    lightText: {
        fontSize :24,
        fontFamily: "OpenSansCondensed-Light",
        color: 'white'
    },
    noteText: {
        fontSize : 20,
        fontFamily: "OpenSansCondensed-Light",
        color: 'white',
        textAlign : "center"
    },
    noteScrollView: {
        width : "100%",
        height : "100%",
        paddingLeft: 5,
        paddingRight: 5
    },
    noteView: {
        flex : 1,
        paddingTop : 10
    },
    locationView: {
        flex : 3,
        justifyContent : "center"
    },
    iconView: {
        flex:1,
        justifyContent : "center",
        alignItems : "center"
    },
    dateView: {
        flex:3,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    timeView: {
        flex : 3,
        justifyContent : "center"
    },
    topRowView: {
        flexDirection: 'row',
        height : 80,
        marginTop : 20
    },
    rowView: {
        flexDirection: 'row',
        height : 40
    },
    lastReservationView: {
        flex : 2,
        alignItems : "center",
        paddingBottom: 40,
        paddingTop: 10
    },
    reservationView: {
        flex : 1,
        alignItems : "center",
        paddingBottom: 60,
        paddingTop: 10
    },
    reservationInnerView: {
        flex : 6,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom : 10
    },
    pickerView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems : "center",
        paddingLeft : 30,
        paddingRight : 30
    },
    picker: {
        width: 120,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    itemText: {
        fontSize :24,
        fontFamily: "OpenSansCondensed-Bold"
    },
    buttonView: {
        flex: 4
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: itemWidth,
        height: 70,
        borderRadius: 5
    },
    buttonText: {
        alignItems: 'center',
        fontSize :30,
        fontFamily: "OpenSansCondensed-Bold"
    },
    resultView: {
        flex : 4,
        alignItems : "center"
    },
    messageView: {
        flex: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom:10
    },
    messageText: {
        fontSize : 20,
        fontFamily: "OpenSansCondensed-Light",
        paddingLeft: 15, paddingRight: 15,
        paddingTop: 10
    }
});

function mapStateToProps(state) {
    return {
        auth: state.auth,
        reservation : state.reservation
    };
}

export default connect(mapStateToProps)(Event);

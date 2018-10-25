import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    StyleSheet
} from 'react-native';
import BaseScreen from "../BaseScreen";
import Carousel from 'react-native-snap-carousel';
import VideoPlayer from 'react-native-video-controls';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment'
import 'moment/locale/tr';

const {width, height} = Dimensions.get("window");
const itemWidth = width - 60;

export default class ProjectCardBig extends BaseScreen {

    constructor(props){
        super();
        this.state = {
            errors: []
        };
        this.props = props;
        this._carousel = {};
    }

    handleSnapToItem(index){
        //console.log("snapped to ", index)
    }

    _renderItem = ( {item, index} ) => {

        return (
            <View style={styles.itemView}>
                    {item.type == 1
                        ?
                        <Image
                            style={styles.itemImage}
                            source={{uri: item.url}}/>
                        :
                        <VideoPlayer
                            style={styles.itemVideo}
                            source={{uri: item.url}}
                            onBuffer={this.onBuffer}
                            onEnd={this.onEnd}
                            rate={1.0}
                            paused={true}
                            disableBack
                            toggleResizeModeOnFullscreen={false}
                        />
                    }
                <Text style={styles.itemText}>{item.title}</Text>
            </View>
        );
    }

    render() {
        
        return (
            <View style={styles.mainView}>
                <View onPress={this.props.onPress} style={styles.onPress}>
                    <View style={styles.carouselView}>
                        <Carousel
                            ref={(c) => { this._carousel = c; }}
                            data={this.props.visual}
                            renderItem={this._renderItem.bind(this)}
                            onSnapToItem={this.handleSnapToItem.bind(this)}
                            sliderWidth={itemWidth}
                            itemWidth={itemWidth}
                            layout={'default'}
                            firstItem={0}
                        />
                    </View>
                    <Text style={styles.name}>{this.props.name}</Text>
                    <Text style={styles.description}>{this.props.longDescription}</Text>
                    <View style={styles.subHeader}>
                        <Text style={styles.name}>Etkinlik Tarihleri</Text>
                    </View>
                    {
                        this.props.event.map((activeItem) => {
                            
                            if (activeItem.status !== 2) {
                                return (
                                    <View>
                                        <TouchableOpacity  onPress={() => this._onPress(activeItem)} style={styles.touchable}>
                                            <Icon
                                                name='calendar'
                                                type='FontAwesome'
                                                color= '#5e5e5e'
                                                underlayColor= "transparent"
                                                size={24}
                                                style={styles.icon}
                                            />
                                            <Text style={styles.dateText}>{moment(activeItem.date).locale('tr').format('DD MMMM YYYY')}</Text>
                                            <Text style={styles.timeText}>{moment(activeItem.date).format('dddd HH:mm')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        })
                    }
                    {
                        this.props.event.length == 0 ? <View style={{marginTop: 10}}><Text style={styles.noteText}>Yakın tarihli bir etkinlik bulunmamaktadır.</Text></View> : null
                    }
                </View>
            </View>
        );
    }
    _onPress = (eventData) => {
        this.props.onPress(eventData);
    };
}

const styles = StyleSheet.create({
    mainView: {
        paddingTop: 20,
        alignItems: 'center'
    },
    onPress: {
        width: itemWidth + 3,
        alignItems: 'center'
    },
    carouselView: {
        backgroundColor: 'transparent',
        height: itemWidth/1.6,
        width: itemWidth
    },
    name: {
        paddingTop: 5,
        fontSize :20,
        color: 'white',
        fontFamily: "OpenSansCondensed-Bold"
    },
    description: {
        paddingLeft: 5,
        paddingRight:5,
        paddingBottom: 5,
        fontSize :18,
        color: 'white',
        fontFamily: "OpenSansCondensed-Light"
    },
    subHeader: {
        borderBottomWidth: 2,
        borderColor:'red',
        justifyContent: 'flex-start'
    },
    touchable: {
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 10,
        width: 250,
        borderRadius: 5,
        paddingTop:5,
        paddingBottom:5
    },
    icon: {
        position: "absolute",
        left: 15,
        top:15
    },
    dateText: {
        fontSize :18,
        fontFamily: "OpenSansCondensed-Bold"
    },
    timeText: {
        fontSize :18,
        fontFamily: "OpenSansCondensed-Light"
    },
    noteText: {
        fontSize :18,
        color : "white",
        fontFamily: "OpenSansCondensed-Light"
    },
    itemView: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        width: itemWidth
    },
    itemImage: {
        width: itemWidth,
        height: itemWidth/1.6
    },
    itemVideo: {
        position: 'relative',
        height: itemWidth/1.6,
        width: itemWidth
    },
    itemText: {
        color: 'white',
        top: 28,
        justifyContent: 'center'
    }
});



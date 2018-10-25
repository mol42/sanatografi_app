import React, {Component} from 'react';
import {Image, Dimensions} from "react-native";
import {
    View
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const {width : sWidth} = Dimensions.get("window");

const findCalculatedWidthHeight = function(screenWidth, width, height, gap) {

    // if image has good space
    if (screenWidth - gap > width) {
        return {
            width,
            height
        }
    } else {
        return {
            width : screenWidth - gap,
            height : (height/width) * (screenWidth - gap)
        }
    }
}

const {width, height} = findCalculatedWidthHeight(sWidth, 308, 31, 100);

const style = {
    header : {
        flexDirection: 'row',
        backgroundColor : 'transparent',
        justifyContent: "center",
        alignItems: 'center',
        height : 55,
        marginTop: -3
    },
    headerImage : {
        width, 
        height
    }
}

export default class SanatografiHeader extends Component {

    render() {
        let {backButton} = this.props;

        return (
            <View style={style.header}>
                <Icon
                    name={backButton ? 'ios-arrow-back' : 'ios-menu'}
                    type='ionicon'
                    color= 'white'
                    underlayColor= "transparent"
                    size={30}
                    style={{position: "absolute", left : 10, top : 15, paddingLeft: 5, paddingRight: 10}}
                    onPress={this.props.onPress}
                />
                <Image source={require("../assets/images/sanatografi_logo.png")} resizeMode="stretch" style={style.headerImage} />
            </View>
        );
    }
}
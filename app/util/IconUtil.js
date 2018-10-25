import {PixelRatio} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import Colors from "../styles/Colors";

// let iconColor = Colors.primary;
let iconSize = 30;
let navIconSize = (__DEV__ === false && Platform.OS === 'android') ? PixelRatio.getPixelSizeForLayoutSize(30) : 30; // eslint-disable-line

const icons = {
    "ion-ios-menu": [Ionicons, 'ios-menu', iconSize, '#FFFFFF'],
    "ion-ios-home": [Ionicons, 'ios-home', iconSize, '#FFFFFF'],
    "ion-ios-search": [Ionicons, 'ios-search', iconSize, '#FFFFFF'],
    "ion-ios-person": [Ionicons, 'ios-person', iconSize, '#FFFFFF'],
    "ion-ios-add-circle": [Ionicons, 'ios-add-circle', iconSize, '#FFFFFF'],
    "ion-ios-notifications": [Ionicons, 'ios-notifications', iconSize, '#FFFFFF'],
    "ion-ios-chatbubbles": [Ionicons, 'ios-chatbubbles', iconSize, '#FFFFFF'],
    "ion-ios-close": [Ionicons, 'ios-close', navIconSize, '#FFFFFF'],
    "ion-ios-arrow-round-back": [Ionicons, 'ios-arrow-round-back', navIconSize, '#FFFFFF'],
    "ion-ios-arrow-back" : [Ionicons, 'ios-arrow-back', navIconSize, '#FFFFFF'],
    "ion-ios-sunny-outline" : [Ionicons, 'ios-sunny-outline', navIconSize, '#FFFFFF'],
    "ion-md-globe": [Ionicons, 'md-globe', navIconSize, '#FFFFFF'],
    "ion-ios-list-box-outline": [Ionicons, 'ios-list-box-outline', navIconSize, '#FFFFFF'],
    "simple-emotsmile" : [SimpleLineIcons, 'emotsmile', navIconSize, '#FFFFFF'],
    "awesome-smile" : [FontAwesome, 'smile-o', navIconSize, '#FFFFFF'],
    "entypo-swap" : [Entypo, "swap", navIconSize, '#FFFFFF']
};

let iconsMap = {};
let iconsLoaded = new Promise((resolve, reject) => {
    new Promise.all(
        Object.keys(icons).map(iconName =>
            icons[iconName][0].getImageSource(
                icons[iconName][1],
                icons[iconName][2],
                icons[iconName][3]
            ))
    ).then(sources => {
        Object.keys(icons)
            .forEach((iconName, idx) => iconsMap[iconName] = sources[idx]);
        resolve(true);
    })
});

export {
    navIconSize,
    iconsMap,
    iconsLoaded
};
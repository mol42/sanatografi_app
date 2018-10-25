import { Navigation } from 'react-native-navigation';
import {Provider} from "react-redux";
import {registerScreens, SCREENS_MAP} from "./app/screens";
import {iconsMap, iconsLoaded} from "./app/util/IconUtil";
import store from "./app/redux/configureStore";

registerScreens(store, Provider);

const iconInsets = {
    top: 4,
    left: 0,
    bottom: -4,
    right: 0
};

function startApp() {
    // start the app
    Navigation.startSingleScreenApp({
        screen:
            {
                label: 'Ana Sayfa',
                screen: SCREENS_MAP.MainScreen.id, // this is a registered name for a screen
                title: 'SANATOGRAFİ',

            },
        drawer: { // optional, add this if you want a side menu drawer in your app
            left: { // optional, define if you want a drawer from the left
                screen: SCREENS_MAP.SideBar.id, // unique ID registered with Navigation.registerScreen
                passProps: {}, // simple serializable object that will pass as props to all top screens (optional),
                fixedWidth: 500, // a fixed width you want your left drawer to have (optional)
            },
        },
        passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
        animationType: 'slide-down', // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
        appStyle : {
            screenBackgroundColor : "black"
        }
    });
}

iconsLoaded.then(() => {
    startApp();
}).catch(err => {
    //console.log(err);
})
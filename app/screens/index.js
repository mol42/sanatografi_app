import { Navigation } from 'react-native-navigation';

import MainScreen from "./main";
import SideBar from "./sideBar";
import Contact from "./contact";
import ProjectCategories from "./projectCategories"
import Projects from "./projects"
import ProjectDetail from "./projectDetail"
import Event from "./event"
import SignUp from "./signUp"
import Login from "./login"
// import ReservationSuccess from "./event/ReservationSuccess"
import MyAccountScreen from "./myAccount";
import ForgotPassword from "./forgotPassword";
import ResetScreen from "./forgotPassword/ResetScreen";
import ResetSuccessScreen from "./forgotPassword/ResetSuccessScreen";

const SCREENS = [];

const SCREENS_MAP = {
    MainScreen : {
        id : 'sanatografi_MainScreen',
        comp : MainScreen
    },
    SideBar : {
        id : 'sanatografi_SideBar',
        comp : SideBar
    },
    Contact : {
        id : 'sanatografi_Contact',
        comp : Contact
    },
    ProjectCategories : {
        id : 'sanatografi_ProjectCategories',
        comp : ProjectCategories
    },
    Projects : {
        id : 'sanatografi_Projects',
        comp : Projects
    },
    ProjectDetail : {
        id : 'sanatografi_ProjectDetail',
        comp : ProjectDetail
    },
    MMO : {
        id : 'sanatografi_MMO',
        comp : Projects
    },
    MMOC : {
        id : 'sanatografi_MMOC',
        comp : Projects
    },
    Event : {
        id : 'sanatografi_Event',
        comp : Event
    },
    SignUp : {
        id : 'sanatografi_SignUp',
        comp : SignUp
    },
    Login : {
        id : 'sanatografi_Login',
        comp : Login
    },
    /*
    ReservationSuccess : {
        id : 'ReservationSuccess',
        comp : ReservationSuccess
    },
    */
    MyAccount : {
        id : 'sanatografi_MyAccount',
        comp : MyAccountScreen
    },
    ForgotPassword : {
        id : 'sanatografi_ForgotPassword',
        comp : ForgotPassword
    },
    ResetScreen : {
        id : 'ResetScreen',
        comp : ResetScreen
    },
    ResetSuccessScreen : {
        id : 'ResetSuccessScreen',
        comp : ResetSuccessScreen       
    }
};

for (let screen in SCREENS_MAP) {
    SCREENS.push(SCREENS_MAP[screen]);
}

const registerScreens = (store, Provider) => {

    SCREENS.forEach(screen => {
        // console.log("Navigation.registerComponent screen.id ->", screen.id);
        Navigation.registerComponent(screen.id, () => screen.comp, store, Provider);
    });
};

export {SCREENS_MAP, SCREENS, registerScreens};
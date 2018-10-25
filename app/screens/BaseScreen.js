import BaseReduxComponent from "../redux/BaseReduxComponent";
import {SCREENS_MAP} from "./";

const global = {
    lastDeeplink : null,
    screenStack : []
}

export default class BaseScreen extends BaseReduxComponent {

    constructor(props, isRoot = false) {
        super(props);

        if (this.props && this.props.navigator) {
            this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        }

        this.isRoot = isRoot;
        
        this.state = {
            lastScreen: {},
        }
    }

    onNavigatorEvent(event) {

        if (event.type == 'DeepLink' && this.isRoot) {
            const screenName = event.link;
            const payload = event.payload;
            // (optional) The payload
            this.pushToActiveScreenStack(screenName, payload);
        }

        // Set active scene to navigationState object
        switch(event.id) {
            case 'willAppear' :
                this.willAppear();
                break;
            case 'didAppear':
                this.didAppear();
                break;
            case 'willDisappear':
                this.willDisappear();
                break;
        }
        // pass event to parent.
        this.handleNavigatorEvent(event);
        // handle a deep link
    }

    handleNavigatorEvent(event) {}

    willAppear(){}

    didAppear(){}

    willDisappear(){}

    /**
     * read the passed props while navigation to active screen
     */
    getNavProps() {
        return this.props.navProps || {};
    }

    getScreenMap() {
        return SCREENS_MAP;
    }

    /**
     * Push screen to to screen stack and it will be visible
     *
     * @param {*} props
     */
    pushToActiveScreenStack(screen, props = {}, navigationProps = {}) {
        const {screenStack} = global;

        if (screenStack.length > 0 && screenStack[screenStack.length - 1] == (screen.id || screen)) {
            return;
        }

        this.props.navigator.push({
            screen: screen.id || screen, // unique ID registered with Navigation.registerScreen
            passProps: {
                navProps : props,
            },
            navigatorStyle : {
                tabBarHidden : false,
                drawUnderTabBar : true,
                navBarHidden : true
            }
        })
        // global.lastScreen = screen.id;
        global.screenStack.push((screen.id || screen));
        return this;
    }

    /**
     * Remove the current screen from stack and show the previos
     * screen
     *
     */
    popPreviousInScreenStack(props = {}) {
        const {screenStack} = global;

        this.props.navigator.pop({
            passProps: {
                navProps : props
            },
            animated: true, // does the pop have transition animation or does it happen immediately (optional)
        });
        screenStack.pop();
        return this;
    }

    /**
     * Reset the screen stack and put the screen to new stack and it will
     * be visible.
     *
     * IMPORTANT NOTE : ıf we use this method a new screen is added to stack and previous
     * screen is removed from the stack but since we are listening event bus system
     * the removed class continue listening so that use carefully.
     *
     * @param {*} screen
     * @param {*} props
     */
    startNewScreenStack(screen, props = {}) {
        const {screenStack} = global;
        
        if (screenStack.length > 0 && screenStack[0] == (screen.id || screen)) {
            return;
        }

        this.props.navigator.resetTo({
            screen: screen.id, // unique ID registered with Navigation.registerScreen
            passProps: {
                navProps : props
            }
        });
        global.screenStack = [];
        global.screenStack.push(screen.id);
    }

    /**
     * Reset stack to top of screen.
     */
    popToRootOfStack() {
        const {screenStack} = global;
        
        if (screenStack.length > 0 && screenStack[0] == (screen.id || screen)) {
            return;
        }

        this.props.navigator.popToRoot({
            animated: true
        });
        const rootScreen = global.screenStack[0];
        global.screenStack = [];
        global.screenStack.push(rootScreen);
        return this;
    }

    switchToTab(tabIndex) {
        this.props.navigator.switchToTab({
            tabIndex: tabIndex // (optional) if missing, this screen's tab will become selected
        });
        return this;
    }

    navigateWithDeepLink(screen, payload={}) {
        this.props.navigator.handleDeepLink({
            link: screen,
            payload: screen
        });
        return this;
    }

    closeDrawer() {
        this.props.navigator.toggleDrawer({
            side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
            animated: true, // does the toggle have transition animation or does it happen immediately (optional)
            to: 'close' // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
        });
        return this;
    }

    openDrawer() {
        this.props.navigator.toggleDrawer({
            side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
            animated: true, // does the toggle have transition animation or does it happen immediately (optional)
            to: 'open' // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
        });
        return this;
    }

    showTabs() {
        this.props.navigator.toggleTabs({
            to: 'shown', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
            animated: true // does the toggle have transition animation or does it happen immediately (optional)
        });
    }

    showLightBox(screen, props = {}) {
        this.props.navigator.showLightBox({
            screen: screen.id, // unique ID registered with Navigation.registerScreen
            passProps: {
                navProps : props
            }, // simple serializable object that will pass as props to the lightbox (optional)
            style: {
                backgroundBlur: "light", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
                backgroundColor: "rgba(0, 0, 0, 0.5)", // tint color for the background, you can specify alpha here (optional)
                tapBackgroundToDismiss: true, // dismisses LightBox on background taps (optional)
            },
            adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
        });
    }

    dismissLightBox() {
        this.props.navigator.dismissLightBox();
    }

    showModal(screen, props = {}) {
        this.props.navigator.showModal({
            screen: screen.id, // unique ID registered with Navigation.registerScreen
            title: "", // title of the screen as appears in the nav bar (optional)
            passProps: {
                navProps : props
            }, // simple serializable object that will pass as props to the modal (optional)
            navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
        });
    }

    hideModal() {
        this.props.navigator.dismissModal({
            animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        });
    }
}
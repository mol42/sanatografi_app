import React, { Component } from 'react';
import {View, ScrollView, ImageBackground, SafeAreaView, StyleSheet} from "react-native";
import {connect} from 'react-redux';
import BaseScreen from "../BaseScreen";
import SanatografiHeader from "../../components/SanatografiHeader";
import {getProjects} from "../../redux/project/actions"
import ProjectCardBig from "../projects/ProjectCardBig"
import moment from "moment/moment";

class ProjectDetail extends BaseScreen {

    static navigatorStyle = {
        navBarHidden: true,
    };

    constructor(props, force) {
        super(props);
    }

    willAppear() {
        this.dispatchAction(getProjects())
    }

    render() {
        let {activeItem} = this.getNavProps();

        return (
            <ImageBackground source={require('../../assets/images/sanatografi_background.png')} style={styles.background}>
                <SafeAreaView style={styles.safeArea}>
                    <SanatografiHeader
                        backButton={true}
                        onPress={this._onPressMenu}/>
                    <ScrollView style={styles.scroll}>
                        <View style={styles.view}>
                            <ProjectCardBig
                                activeItem={activeItem}
                                categoryId={activeItem.categoryId}
                                name={activeItem.name}
                                visual={activeItem.visual}
                                event={activeItem.event}
                                longDescription={activeItem.longDescription}
                                onPress={(eventData) => this._onPressEvent(eventData, activeItem)}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        );
    }

    _onPressMenu = () => {
        this.popPreviousInScreenStack();
    };

    _onPressEvent = (eventData, activeItem) => {
        this.pushToActiveScreenStack(this.getScreenMap().Event, {eventData, activeItem})
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
    scroll: {
        flex:1
    },
    view: {
        flex:1,
        paddingTop: 20,
        alignItems: 'center'
    }
});

function mapStateToProps(state) {
    return {
        project : state.project,
    };
}

export default connect(mapStateToProps)(ProjectDetail);

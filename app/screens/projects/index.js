import React, { Component } from 'react';
import {View, Text, ScrollView, TouchableOpacity, ImageBackground, Image, SafeAreaView, StyleSheet} from "react-native";
import {connect} from 'react-redux';
import BaseScreen from "../BaseScreen";
import { Container, Button, Content, Input, Item, Form, Label, Card, CardItem, Body} from 'native-base';
import {getTest} from "../../redux/global/actions";
import { Navigation } from 'react-native-navigation';
import SideBar from "../sideBar"
import SanatografiHeader from "../../components/SanatografiHeader";
import {getProjects} from "../../redux/project/actions"
import ProjectCard from "../projects/ProjectCard"
import ProjectCardBig from "../projects/ProjectCardBig"

class Projects extends BaseScreen {

    static navigatorStyle = {
        navBarHidden: true,
    };

    constructor(props, force) {
        super(props);
    }

    willAppear() {
        this.dispatchAction(getProjects());
    }

    render() {
        let {categoryName, categoryId} = this.getNavProps();
        let {projects} = this.props.project || [];
        let projectQuantity = 0;

        for (let projectsItem in projects) {
            if (projects[projectsItem].categoryId == categoryId) {projectQuantity++}
        }

        return (
            <ImageBackground source={require('../../assets/images/sanatografi_background.png')} style={styles.background}>
                <SafeAreaView style={styles.safeArea}>
                    <SanatografiHeader
                        backButton={true}
                        onPress={this._onPressMenu}/>
                    <ScrollView style={styles.scroll}>
                        <View style={styles.mainView}>
                            <View style={styles.subHeader}>
                                <Text style={styles.textBold}>{categoryName}</Text>
                            </View>
                                {
                                    projects.map((activeItem) => {
                                        if (projectQuantity == 1 && activeItem.categoryId == categoryId) {
                                            return (
                                                <ProjectCardBig
                                                    activeItem={activeItem}
                                                    categoryId={activeItem.categoryId}
                                                    name={activeItem.name}
                                                    longDescription={activeItem.longDescription}
                                                    visual={activeItem.visual}
                                                    event={activeItem.event}
                                                    onPress={(eventData) => this._onPressEvent(eventData, activeItem)}
                                                />
                                            );
                                        }
                                        if (projectQuantity > 1 && activeItem.categoryId == categoryId) {
                                            return (
                                                <ProjectCard
                                                    activeItem={activeItem}
                                                    categoryId={activeItem.categoryId}
                                                    name={activeItem.name}
                                                    shortDescription={activeItem.shortDescription}
                                                    frontPicture={activeItem.frontPicture}
                                                    onPress={() => this._onPress(activeItem)}
                                                />
                                            );
                                        }
                                        else {
                                            return(null)
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
        this.popPreviousInScreenStack();
    };

    _onPress = (activeItem) => {
        this.pushToActiveScreenStack(this.getScreenMap().ProjectDetail, {activeItem})
    };

    _onPressEvent = (eventData, activeItem) => {
        this.pushToActiveScreenStack(this.getScreenMap().Event, {eventData, activeItem})
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
    scroll: {
        flex:1
    },
    mainView: {
        flex:1,
        paddingTop: 20,
        alignItems: 'center'
    },
    subHeader: {
        borderBottomWidth: 4,
        borderColor:'red',
        justifyContent: 'flex-start'
    },
    textBold: {
        fontSize : 30,
        color: 'white',
        fontFamily: "OpenSansCondensed-Bold"
    }
});

function mapStateToProps(state) {
    return {
        project : state.project,
    };
}

export default connect(mapStateToProps)(Projects);

import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    SafeAreaView,
    StyleSheet
} from 'react-native';
import BaseScreen from "../BaseScreen";
import {connect} from "react-redux";
import SanatografiHeader from "../../components/SanatografiHeader";
import CategoryCard from "../projectCategories/CategoryCard"
import {getProjectCategories} from "../../redux/project/actions"

class ProjectCategories extends BaseScreen {

    static navigatorStyle = {
        navBarHidden: true,
    };

    willAppear() {
        this.dispatchAction(getProjectCategories());
    }

    render() {
        let {projectCategories} = this.props.project || [];

        return (
            <ImageBackground source={require('../../assets/images/sanatografi_background.png')} style={styles.background}>
                <SafeAreaView style={styles.safeArea}>
                    <SanatografiHeader
                        backButton={true}
                        onPress={this._onPressMenu}/>
                    <View style={styles.mainView}>
                        <View style={styles.subHeader}>
                            <Text style={styles.textBold}>PROJELER</Text>
                        </View>
                    {
                        projectCategories.map((activeItem) => {
                            return <CategoryCard
                                name={activeItem.name}
                                onPress={() => this._onPress(activeItem.name, activeItem.id)}
                        />
                        })
                    }
                    </View>
                </SafeAreaView>
            </ImageBackground>
        );
    }

    _onPressMenu = () => {
        this.popPreviousInScreenStack();
    }

    _onPress = (categoryName, categoryId) => {
        this.pushToActiveScreenStack(this.getScreenMap().Projects, {categoryName, categoryId})
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
    mainView: {
        paddingTop: 40,
        alignItems: 'center'
    },
    subHeader: {
        borderBottomWidth: 4,
        borderColor:'red',
        justifyContent: 'flex-start',
        marginBottom: 40
    },
    textBold: {
        fontSize : 30,
        color: 'white',
        fontFamily: "OpenSansCondensed-Bold"
    },
});

function mapStateToProps(state) {
    return {
        project : state.project,
    };
}

export default connect(mapStateToProps)(ProjectCategories);

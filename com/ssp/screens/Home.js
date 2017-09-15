import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, ListView,TouchableHighlight } from 'react-native';
import {AppConstants} from './../utils/AppConstants'
import {AppConfig} from './../AppConfig'



export class HomeScreen extends React.Component {
    //static navigationOptions = { title:AppConfig.getScreenDataById(AppConstants.HOME_SCREEN).title};
    static navigationOptions = { title:"Home"};
    static config;
    routeParams;
    constructor(props) {
        super(props);
        this.routeParams = this.props.navigation.state.params;
        this.state = {
            isLoading:true,
            items:[]
        };
    }

    componentDidMount() {
        const datasource = new ListView.DataSource({rowHasChanged: (r1, r2) => {
            var hasChanged = (r1 !== r2 || r1.updated || r2.updated);
            if (r1) r1.updated = false;
            if (r2) r2.updated = false;
            return hasChanged;
          }
        });
        this.setState({
            dataSource: datasource.cloneWithRows(this.routeParams.item.data),
            isLoading: false,
            items: this.routeParams.item.data
        },function () {
            //console.log(this.state.isLoading);
        });
    }

    _onPressRow(rowID, rowData) {
        /* rowData.isSelect = !rowData.isSelect;
         var dataClone = this.state.data;
         dataClone[rowID] = rowData;
         this.setState({
             data: dataClone
         });*/
        // console.log(rowData);
        navigate('Standard', { name: 'Jane' });
     }
   
    render() {
        const { navigate } = this.props.navigation;
        if (!this.state.isLoading) {
            return (
                <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow = {this._renderRow.bind(this)}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                />
            )
        }else{
            return null;
        }
    }

    _renderRow(rowData, rowID) {
        const { navigate } = this.props.navigation;
        return (
            /*<TouchableHighlight onPress={this._onPressRow.bind(rowID, rowData)}>*/
            <TouchableHighlight 
            underlayColor='transparent'
            style = {styles.container} 
            onPress={ ()=>  navigate('Standard', { item: rowData})}>    
                <View>
                    <Text style={styles.text}>{rowData.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        margin:0,
        paddingTop:8,
        paddingBottom:8
    },
    text: {
        marginLeft: 12,
        fontSize: 22      
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#E0E0E0',
    },
});
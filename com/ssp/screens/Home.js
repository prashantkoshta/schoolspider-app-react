import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, ListView,TouchableHighlight } from 'react-native';
import {AppConfig} from '../AppConfig';

export class HomeScreen extends React.Component {
    static navigationOptions = { title: 'Home' };
    static config;
    constructor(props) {
        super(props);
        
        this.appConfig = new AppConfig();
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
        this.state = {
            datasource:datasource,
            isLoading:true,
            items:[]
        };
        this.fetchData();
    }

   
    fetchData() {
        var data = {
            "collection": "appconfig",
            "querytype": "findone",
            "query": {
                "appid": "schoolspider"
            }
        };

        fetch(this.appConfig.getEndPoint()+'/fetchData',{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
          })
          .then((response) => response.json())
          .then((responseData) => {
            this.setState({
                dataSource: this.state.datasource.cloneWithRows(responseData.itemScreen001.data),
                isLoading: !this.state.isLoading,
                items: responseData.itemScreen001.data
            },function () {
                console.log(this.state.isLoading);
            });

          })
          .done();
          
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
                dataSource={this.state.dataSource}
                renderRow = {this._renderRow.bind(this)}
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
        padding: 8,
        flexDirection: 'row',
    },
    text: {
        marginLeft: 12,
        fontSize: 22      
    },
});

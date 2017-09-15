import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, ListView,TouchableHighlight } from 'react-native';
import {ListSubItem} from './../component/ListSubItem';
import {AppConstants} from './../utils/AppConstants'
import {AppConfig} from './../AppConfig'

export class StandardScreen extends React.Component {
    static navigationOptions = { title: 'Class' };
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
        this.state = {
            datasource:datasource,
            isLoading:true,
            items:[]
        };
        this.fetchData();
    }

   
    fetchData() {
        var data = {
            "query":
            [
                { "$match": {  "type": "tutorial" } },
                { "$group": {
                   "_id": { 
                           "class": "$class",
                           "term":"$term",
                           "term_title":"$term_title",
                           "class_title":"$class_title",
                           "type":"$type"
                       
                       }
                 } },
                { "$sort": { "_id.class": 1, "_id.term":1 } }
          ]
        };
        fetch(AppConstants.END_POINT_URL+'/getClassAndTerms',{
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
                dataSource: this.state.datasource.cloneWithRows(responseData),
                isLoading: !this.state.isLoading,
                items: responseData
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
            <TouchableHighlight 
            underlayColor='transparent'
            style = {styles.container}>    
                <View>
                    <Text style={styles.text}>{rowData.class_title}</Text>
                    <ListSubItem items={rowData.terms} onSelectedItem={(itemData)=>  navigate('Subject', {item: itemData})} />
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

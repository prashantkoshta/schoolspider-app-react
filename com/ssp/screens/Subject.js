import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, ListView,TouchableHighlight } from 'react-native';
import {AppConstants} from './../utils/AppConstants'
import {AppConfig} from './../AppConfig'

export class SubjectScreen extends React.Component {
    static navigationOptions = { title: 'Subject' };
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
            "query": [
                {
                    "$match": {
                        "class": this.routeParams.item.class,
                        "term":this.routeParams.item.term,
                        "type": this.routeParams.item.type,
                    }
                },
                {
                    "$group": {
                        "_id": "$subject",
                        "id": { "$first": "$_id" },
                        "class": { "$first": "$class" },
                        "class_title": { "$first": "$class_title" },
                        "term": { "$first": "$term" },
                        "term_title": { "$first": "$term_title" },
                        "subject": { "$first": "$subject" },
                        "lesson": { "$first": "$lesson" },
                        "topic": { "$first": "$topic" },
                        "type": { "$first": "$type" }
                    }
                },
                {
                    "$project": {
                        "_id": "$id",
                        "class": "$class",
                        "class_title": "$class_title",
                        "term": "$term",
                        "term_title": "$term_title",
                        "subject": "$subject",
                        "lesson": "$lesson",
                        "topic": "$topic",
                        "type": "$type"
                    }
                },
                {
                    "$sort": {
                        "subject": 1
                    }
                }
            ]
        };

        fetch(AppConstants.END_POINT_URL+'/getDataAggregate',{
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
            style = {styles.container} 
            onPress={ ()=>  navigate('Lesson', {item: rowData})}>    
                <View>
                    <Text style={styles.text}>{rowData.subject}</Text>
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

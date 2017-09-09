import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, ListView,TouchableHighlight } from 'react-native';
import {AppConfig} from '../AppConfig';

import {ContentData} from './ContentData';

export class LessonContentScreen extends React.Component {
    static navigationOptions = { title: 'Lesson' };
    static config;
    routeParams;
    constructor(props) {
        super(props);
        this.routeParams = this.props.navigation.state.params;
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
            "query": [
                {
                    "$match": {
                        "class": this.routeParams.item.class,
                        "subject": this.routeParams.item.subject,
                        "lesson": this.routeParams.item.lesson,
                        "type": this.routeParams.item.type
                    }
                },
                {
                    "$group": {
                        "_id": "$topic",
                        "id": { "$first": "$_id" },
                        "class": { "$first": "$class" },
                        "class_title": { "$first": "$class_title" },
                        "subject": { "$first": "$subject" },
                        "lesson": { "$first": "$lesson" },
                        "refurls": { "$first": "$refurls" }
                    }
                },
                {
                    "$project": {
                        "_id": "$id",
                        "class": "$class",
                        "class_title": "$class_title",
                        "subject": "$subject",
                        "lesson": "$lesson",
                        "refurls": "$refurls"
                    }
                },
                {
                    "$sort": {
                        "lesson": 1
                    }
                }
            ]
        };


        fetch(this.appConfig.getEndPoint()+'/getDataAggregate',{
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
                    <ContentData pagesData={this.state.items}/>
                )
            }else{
                return null;
            }
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

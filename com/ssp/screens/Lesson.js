import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, Button, Alert, ListView,TouchableHighlight } from 'react-native';

export class LessonScreen extends React.Component {
    static navigationOptions = { title: 'Lesson' };
    
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['Lesson 1', 'Lesson 2']),
        };
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
        <ListView
            dataSource={this.state.dataSource}
            renderRow = {this._renderRow.bind(this)}
            />
        );
    }

    _renderRow(rowData, rowID) {
        const { navigate } = this.props.navigation;
        return (
            <TouchableHighlight 
            underlayColor='transparent'
            style = {styles.container} 
            onPress={ ()=>  navigate('Content', { name: rowData})}>    
                <View>
                    <Text style={styles.text}>{rowData}</Text>
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

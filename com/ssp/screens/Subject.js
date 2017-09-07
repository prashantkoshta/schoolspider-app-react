import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, Button, Alert, ListView,TouchableHighlight } from 'react-native';

export class SubjectScreen extends React.Component {
    static navigationOptions = { title: 'Subject' };
    
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['English', 'Math']),
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
            onPress={ ()=>  navigate('Lesson', { name: rowData})}>    
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

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, Button, Alert, ListView,TouchableHighlight } from 'react-native';

export class HomeScreen extends React.Component {
    static navigationOptions = { title: 'SP' };
    
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2','row 3','Row 4']),
        };
    }
   
    render() {
        const { navigate } = this.props.navigation;
        return (
        <ListView style={styles.container}
            dataSource={this.state.dataSource}
            renderRow = {this._renderRow.bind(this)}
            />
        );
    }

    _renderRow(rowData:string, sectionID: number, rowID: number) {
        console.log('render row ...');
        return (
            <TouchableHighlight onPress={this._onPressRow.bind(rowID, rowData)}>
            <View>
                <Text style={styles.text}>{rowData}</Text>
            </View>
            </TouchableHighlight>
        );
    }

    _onPressRow(rowID, rowData) {
       /* rowData.isSelect = !rowData.isSelect;
        var dataClone = this.state.data;
        dataClone[rowID] = rowData;
        this.setState({
            data: dataClone
        });*/
       // console.log(rowData);
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
        fontSize: 22,
        height:48
      },
});

import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button, Alert, ListView,TouchableHighlight } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {Content} from './Content';
import {AppConfig} from '../AppConfig';

export class ContentData extends React.Component {
    static config;
    constructor(props) {
        super(props);
        this.appConfig = new AppConfig();

        console.log("###    pagesData   ###",this.props.pagesData[0]);

        let page_Data = this.props.pagesData[0];

        console.log("###    refurls   ###",page_Data["refurls"]);

        this.state = {
            items:page_Data.refurls,
            selectedIndex:0,
            currentUrl:page_Data.refurls[0],
            gestureName: 'none',
            maxCount:page_Data.refurls.length
        };
        
    }

    getInitialState() {
        return {
            pagesData: []
        };
    }

    componentDidMount() {
       
    }

    onSwipe(gestureName, gestureState) {
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        this.setState({gestureName: gestureName});
        switch (gestureName) {
          case SWIPE_UP:
            // this.setState({backgroundColor: 'red'});
            break;
          case SWIPE_DOWN:
            // this.setState({backgroundColor: 'green'});
            break;
          case SWIPE_LEFT:
            // this.setState({backgroundColor: 'blue'});
            this.updateSelectedPage(this.state.selectedIndex+1);
            break;
          case SWIPE_RIGHT:
            // this.setState({backgroundColor: 'yellow'});
            this.updateSelectedPage(this.state.selectedIndex-1);
            break;
        }
    }

    updateSelectedPage(n){
        if(n == -1  || n == this.state.maxCount) return;
        //
        if(n<=this.state.selectedIndex < this.state.maxCount){
            this.setState({
                selectedIndex: n,
                currentUrl:this.state.items[n]
            });
        }
    }


    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
          };

        return (
            <GestureRecognizer
                onSwipe={(direction, state) => this.onSwipe(direction, state)}
                config={config}
                style={styles.container}>
                <Text style={styles.text}>{this.state.currentUrl}</Text>
                <Text>onSwipe callback received gesture: {this.state.gestureName}</Text>
                <Content pdfURL={this.state.currentUrl} />
            </GestureRecognizer>
        )
           
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

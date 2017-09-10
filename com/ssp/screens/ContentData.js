import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button, Alert, ListView,TouchableHighlight ,Dimensions } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Pdf from 'react-native-pdf';

import {AppConstants} from './../utils/AppConstants'
import {AppConfig} from './../AppConfig'

export class ContentData extends React.Component {
    static config;
    constructor(props) {
        super(props);
        let page_Data = this.props.pagesData[0];
        this.state = {
            page: 1,
            pageCount: 1,
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
        this.props.onPageUpdate(this.state.selectedIndex+1,this.state.maxCount);
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
            this.props.onPageUpdate(this.state.selectedIndex+1,this.state.maxCount);
        }
    }

    prePage=()=>{
        if (this.pdf){
            let prePage = this.state.page>1?this.state.page-1:1;
            this.pdf.setNativeProps({page: prePage});
            this.setState({page:prePage});
            console.log(`prePage: ${prePage}`);
        }
    }

    nextPage=()=>{
        if (this.pdf){
            let nextPage = this.state.page+1>this.state.pageCount?this.state.pageCount:this.state.page+1;
            this.pdf.setNativeProps({page: nextPage});
            this.setState({page:nextPage});
            console.log(`nextPage: ${nextPage}`);
        }

    }


    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
          };

        let source = {uri:this.state.currentUrl,cache:false}; 

        return (
            <GestureRecognizer
                onSwipe={(direction, state) => this.onSwipe(direction, state)}
                config={config}
                style={styles.container}>

                <Pdf ref={(pdf)=>{this.pdf = pdf;}}
                    source={source}
                    page={1}
                    scale={1}
                    horizontal={false}
                    onLoadComplete={(pageCount)=>{
                        this.setState({pageCount: pageCount});
                        console.log(`total page count: ${pageCount}`);
                    }}
                    onPageChanged={(page,pageCount)=>{
                        this.setState({page:page});
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    style={styles.pdf}/>

            </GestureRecognizer>
        )

        /*

            <GestureRecognizer
                onSwipe={(direction, state) => this.onSwipe(direction, state)}
                config={config}
                style={styles.container}>
                <Text style={styles.text}>{this.state.currentUrl}</Text>
                <Content pdfURL={this.state.currentUrl}></Content>
            </GestureRecognizer>

        */
           
    }    
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
    },
    text: {
        marginLeft: 12,
        fontSize: 22      
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
    }
});

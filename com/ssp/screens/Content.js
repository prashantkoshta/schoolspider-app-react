import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, Button, Alert, ListView,TouchableHighlight } from 'react-native';
import PDFView from 'react-native-pdf-view';

export class ContentScreen extends React.Component {
    static navigationOptions = { title: 'Lesson Name' };
    
    constructor() {
        super();
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <PDFView ref={(pdf)=>{this.pdfView = pdf;}}
                         path={"http://schoolspider.in/School/app-content/ryan-class1english5-1.pdf"}
                         onLoadComplete = {(pageCount)=>{
                            this.pdfView.setNativeProps({
                                zoom: 1.5
                            });
                         }}
                         style={styles.pdf}/>
        );
    }

   

    
}


var styles = StyleSheet.create({
    pdf: {
        flex:1
    }
});

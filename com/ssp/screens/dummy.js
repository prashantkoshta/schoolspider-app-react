import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, Button, Alert, ListView,TouchableHighlight } from 'react-native';
import Pdf from 'react-native-pdf';

export class ContentScreen extends React.Component {
    static navigationOptions = { title: 'Lesson Name' };
    
    constructor() {
        super();
        //"http://schoolspider.in/School/app-content/ryan-class1english5-1.pdf
        this.state = {
            page: 1,
            pageCount: 1,
        };
        this.pdf = null;
    }
 
    componentDidMount() {
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
        let source = {uri:'https://www.irs.gov/pub/irs-pdf/fw2.pdf',cache:true};
        //let source = {uri:'bundle-assets://test.pdf'};
        //let source = require('./test.pdf'); //ios only
        //let source = {uri:"data:application/pdf;base64, ..."}; // this is a dummy
 
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <TouchableHighlight  disabled={this.state.page==1} style={this.state.page==1?styles.btnDisable:styles.btn} onPress={()=>this.prePage()}>
                        <Text style={styles.btnText}>{'Previous'}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight  disabled={this.state.page==this.state.pageCount} style={this.state.page==this.state.pageCount?styles.btnDisable:styles.btn}  onPress={()=>this.nextPage()}>
                        <Text style={styles.btnText}>{'Next'}</Text>
                    </TouchableHighlight>
                </View>
                <Pdf ref={(pdf)=>{this.pdf = pdf;}}
                    source={source}
                    page={1}
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
            </View>
        )
  }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    btn: {
        margin: 5,
        padding:5,
        backgroundColor: "blue",
    },
    btnDisable: {
        margin: 5,
        padding:5,
        backgroundColor: "gray",
    },
    btnText: {
        color: "#FFF",
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
    }
});
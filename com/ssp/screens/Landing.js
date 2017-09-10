import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import {AppConstants} from './../utils/AppConstants'
import {AppConfig} from './../AppConfig'

export class LandingScreen extends React.Component {
 /* _onPress() {
    //Alert.alert('on Press!');
    navigate('Standard')
   }*/
    static navigationOptions = { 
        title: 'School Spider',
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            isLoading:true,
            configuration:{}
        };
    }

    componentDidMount() {
        if(!AppConfig.isAppLoaded){
            this.fetchData();
        }else{
            this.setState({
                isLoading: false,
                configuration: AppConfig.getConfig()
            },function () {
                console.log(this.state.isLoading);
            });
        }
       
    }

    fetchData() {
        var data = {
            "collection": "appconfig",
            "querytype": "findone",
            "query": {
                "appid": "schoolspider"
            }
        };

        fetch(AppConstants.END_POINT_URL+'/fetchData',{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
          })
          .then((response) => response.json())
          .then((responseData) => {
            AppConfig.setConfig(responseData);
            this.setState({
                isLoading: !this.state.isLoading,
                configuration: responseData
            },function () {
                console.log(this.state.isLoading);
            });

          })
          .done();
          
      }


    render() {
        const { navigate } = this.props.navigation;
        return (
        <View style={styles.container}>
            <Image 
            style={{width: 75, height: 75}} 
            source={require('./../../../assets/icon.png')}></Image>


            {!this.state.isLoading &&  <Button
                title="Start Now"
                color="#841584"
                accessibilityLabel="Learn more about your school app."
                onPress={() =>
                    navigate('Home', { item: AppConfig.getScreenDataById(AppConstants.HOME_SCREEN) })
                }>
                </Button>}
           
        </View>
        );
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

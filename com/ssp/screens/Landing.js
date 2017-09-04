import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, Button, Alert } from 'react-native';

export class LandingScreen extends React.Component {
 /* _onPress() {
    //Alert.alert('on Press!');
    navigate('Standard')
   }*/
    static navigationOptions = { 
        title: 'School Spider',
        header: null
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
        <View style={styles.container}>
            <Image 
            style={{width: 75, height: 75}} 
            source={require('./../../../assets/icon.png')}></Image>
            <Button
            onPress={() =>
                navigate('Home', { name: 'Jane' })
            }
            title="Start Now"
            color="#841584"
            accessibilityLabel="Learn more about your school app."
            />
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

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, Button, Alert } from 'react-native';



export class StandardScreen extends React.Component {
    static navigationOptions = { title: 'Standard' };  
    render() {
        const { navigate } = this.props.navigation;
        return (
        <View style={styles.container}>
            <Button
            onPress={() =>
                navigate('Home', { name: 'Jane' })
            }
            title="Home"
            color="#841584"
            accessibilityLabel="Learn more about your school app."
            />
            
            <Text>Shake your phone to open the developer menu.</Text>
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

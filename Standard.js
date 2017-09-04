import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';

export class StandardScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Test me7777</Text>
        <Text>Changes you make will automatically reload.</Text>
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

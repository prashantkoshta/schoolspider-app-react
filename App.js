import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { StandardScreen } from './com/ssp/screens/Standard';
import { HomeScreen } from './com/ssp/screens/Home';
import { LandingScreen } from './com/ssp/screens/Landing';


export default App = StackNavigator({
  Landing: { screen: LandingScreen },
  Home: { screen: HomeScreen },
  Standard: { screen: StandardScreen },
});

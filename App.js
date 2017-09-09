import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { LandingScreen } from './com/ssp/screens/Landing';
import { HomeScreen } from './com/ssp/screens/Home';
import { StandardScreen } from './com/ssp/screens/Standard';
import { SubjectScreen } from './com/ssp/screens/Subject';
import { LessonScreen } from './com/ssp/screens/Lesson';
import { LessonContentScreen } from './com/ssp/screens/LessonContent';

export default App = StackNavigator({
  Landing: { screen: LandingScreen },
  Home: { screen: HomeScreen },
  Standard: { screen: StandardScreen },
  Subject: { screen: SubjectScreen },
  Lesson: { screen: LessonScreen },
  LessonContent: { screen: LessonContentScreen }
});
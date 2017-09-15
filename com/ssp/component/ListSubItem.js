  import React, { Component } from 'react';
  import { StyleSheet, Text, View, Image, Button, Alert, ListView,TouchableHighlight } from 'react-native';
  import {AppConstants} from './../utils/AppConstants'
  import {AppConfig} from './../AppConfig'
  
  export class ListSubItem extends React.Component {
      constructor(props) {
          super(props);
      }

      onSelect(item){
        console.log("############",item);
        this.props.onSelectedItem(item);
      }
      render() {
        var ref = this;  
        var listItems = this.props.items.map(function(item) {
            return (
                <TouchableHighlight key={item.term}
                underlayColor='transparent'
                style = {styles.container} 
                onPress={()=>{
                    ref.onSelect(item)
                }}>    
                    <View>
                        <Text style={styles.text} key={item.term}>{item.term_title}</Text>
                    </View>
                </TouchableHighlight>
            );
          });
          return (
               
            <View>
                {listItems}
            </View>
           
          );
      }
      
  }
  
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: '#FFFFFF',
          margin:0,
          paddingTop:8,
          paddingBottom:8
      },
      text: {
          marginLeft: 24,
          fontSize: 16,
          color:'#283593',

      },
      separator: {
          flex: 1,
          height: StyleSheet.hairlineWidth,
          backgroundColor: '#E0E0E0',
      },
  });
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CalculatorComponent from './Calculator';
import {createStore} from 'redux';
import { Provider } from 'react-redux';

const initialState = {
  screen:'null',    //Put Initial State Here
  numbers:[
    {id:1,title:'1'},
    {id:2,title:'2'},
    {id:3,title:'3'},
    {id:4,title:'4'},
    {id:5,title:'5'},
    {id:6,title:'6'},
    {id:7,title:'7'},
    {id:8,title:'8'},
    {id:9,title:'9'},
    {id:10,title:'0'},
    {id:11,title:'+'},
    {id:12,title:'-'},
    {id:13,title:'*'},
    {id:14,title:'/'},
    {id:15,title:'='},
  ]    
}

const reducer = (state=initialState,action) =>{    //Old State + Action = New State
  return state;
}

const store = createStore(reducer);    //Create State Store

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar style="dark" backgroundColor="#fafafa"/>
        <CalculatorComponent/>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});

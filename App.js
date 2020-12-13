import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CalculatorComponent from './Calculator';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/reducer';

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

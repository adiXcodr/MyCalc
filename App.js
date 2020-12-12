import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CalculatorComponent from './Calculator';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="#fafafa"/>
      <CalculatorComponent/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import AppNavigator from './routes/AppNavigator';
console.reportErrorsAsExceptions = false;

export default function App() {
  return (
     <AppNavigator/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width:"100%",
  },
});


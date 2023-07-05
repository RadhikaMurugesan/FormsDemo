import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import FormsPage from './src/screens/FormsPage';
import DetailsPage from './src/screens/DetailsPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocationPage from './src/screens/LocationPage';
import CameraPage from './src/screens/CameraPage';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={FormsPage} />
        <Stack.Screen name="Details" component={DetailsPage} />
        <Stack.Screen name="Location" component={LocationPage} />
        <Stack.Screen name="Camera" component={CameraPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});

export default App;

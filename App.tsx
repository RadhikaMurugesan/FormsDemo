import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import FormsPage from './src/screens/FormsPage';
import DetailsPage from './src/screens/DetailsPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LocationPage from './src/screens/LocationPage';
import CameraPage from './src/screens/CameraPage';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackComponent = () => (
  <Stack.Navigator initialRouteName="Forms" >
    <Stack.Screen name="Forms" component={FormsPage} options={{
      headerShown: false
    }} />
    <Stack.Screen name="Details" component={DetailsPage} />
  </Stack.Navigator>
);

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStackComponent} />
        <Drawer.Screen name="Location" component={LocationPage} />
        <Drawer.Screen name="Camera" component={CameraPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});

export default App;

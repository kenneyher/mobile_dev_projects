import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function UsersStackScreen() {
  return (
    <View style={styles.container}>
      <Text>Users Stack Screen</Text>
    </View>
  );
}

function WeatherStackScreen() {
  return (
    <View style={styles.container}>
      <Text>Weather Stack Screen</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Users" component={UsersStackScreen} />
        <Drawer.Screen name="Weather" component={WeatherStackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

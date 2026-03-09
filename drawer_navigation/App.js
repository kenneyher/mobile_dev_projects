import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

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

function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
    </View>
  );
}

function SignupScreen() {
  return (
    <View style={styles.container}>
      <Text>Sign Up Screen</Text>
    </View>
  );
}

export default function App() {
  const [auth, setAuth] = useState(false);

  return (
    <NavigationContainer>
      {auth ? (
        <Drawer.Navigator>
          <Drawer.Screen name="Users" component={UsersStackScreen} />
          <Drawer.Screen name="Weather" component={WeatherStackScreen} />
        </Drawer.Navigator>
      ) : (
        <Tab.Navigator
          initialRouteName="Login"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name == "Login") {
                iconName = focused ? "log-in" : "log-in-outline";
              } else if (route.name == "Sign Up") {
                iconName = focused ? "person-add" : "person-add-outline";
              }

              return <Ionicons name={iconName} size={24} color={color} />;
            },
            tabBarActiveTintColor: "purple",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Login" component={LoginScreen} />
          <Tab.Screen name="Sign Up" component={SignupScreen} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

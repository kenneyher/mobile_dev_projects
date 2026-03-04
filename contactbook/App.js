import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ContactScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Contact Screen</Text>
      <Text onPress={() => navigation.navigate("contact_details")}>
        Go to contact details
      </Text>
    </View>
  );
}

function ContactDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text>Contact Details Screen</Text>
    </View>
  );
}

function ContactsStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="contacts"
        component={ContactScreen}
        options={{
          title: "Contacts",
        }}
      />
      <Stack.Screen
        name="contact_details"
        component={ContactDetailsScreen}
        options={{
          title: "Details",
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileScreen() {
  return <Text>Profile Screen</Text>;
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="contacts_tab"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name == "contacts_tab") {
              iconName = focused ? "people" : "people-outline";
            } else if (route.name == "profile_tab") {
              iconName = focused ? "person" : "person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="contacts_tab"
          component={ContactsStackScreen}
          options={{
            title: "Contacts",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="profile_tab"
          component={ProfileScreen}
          options={{
            title: "Profile",
            headerShown: true,
          }}
        />
      </Tab.Navigator>
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

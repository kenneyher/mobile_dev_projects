import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Text,
  View,
  Button,
  TextInput,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert("No values stored under that key.");
  }
}

export default function App() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text>Save an item, and grab it later!</Text>
      <View style={{ margin: 20 }}>
        <Text>Enter a key:</Text>
        <TextInput
          style={styles.input}
          value={key}
          onChangeText={setKey}
          placeholder="Enter key"
        />
        <Text>Enter a value:</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          placeholder="Enter value"
        />
      </View>
      <Button
        title="Save this key/value pair"
        onPress={() => {
          save(key, value);
          setKey("");
          setValue("");
        }}
      />
      <Text>Enter your key:</Text>
      <TextInput
        style={styles.input}
        onSubmitEditing={(event) => {
          getValueFor(event.nativeEvent.text);
        }}
        placeholder="Enter key to get value"
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
});

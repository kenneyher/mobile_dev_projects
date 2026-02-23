import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { useState, useCallback, useMemo } from "react";

/**
 * Calculates the nth number in the Fibonacci sequence.
 * @param {number} nth
 * @returns {number}
 */
function fibonacci(nth) {
  if (nth == 1) return 0;
  if (nth == 2) return 1;

  return fibonacci(nth - 1) + fibonacci(nth - 2);
}

export default function App() {
  const [nth, setNth] = useState(1);
  // const [result, setResult] = useState(0);
  const result = useMemo(() => {
    if (nth === "") return 0;
    return fibonacci(Number(nth));
  }, [nth]);

  const calculate = useCallback(() => {
    //   setResult(fibonacci(nth));
  }, [nth]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Fibonacci Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 34"
        keyboardType="numeric"
        value={nth}
        onChangeText={setNth}
      />
      <Pressable style={styles.button} onPress={calculate}>
        <Text style={styles.buttonText}>Calculate</Text>
      </Pressable>
      <Text style={styles.resultText}>Result: {result}</Text>
    </View>
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
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "lightgray",
    width: "70%",
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
  },
  button: {
    backgroundColor: "#7fc1dbff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: "45%",
    margin: 5,
  },
  buttonText: {
    color: "white",
    textTransform: "uppercase",
    textAlign: "center",
  },
  resultText: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 15,
  },
});

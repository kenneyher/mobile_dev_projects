import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useState, useRef } from "react";

function zeroPad(num) {
  return num < 10 ? `0${num}` : num;
}

function formatHMS(elapsed) {
  const hours = Math.floor(elapsed / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);
  const seconds = (elapsed % 3600) % 60;

  return `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`;
}

export default function App() {
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  function startTimer() {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setElapsed((prevElapsed) => ++prevElapsed);
    }, 1000);
  }

  function pauseTimer() {
    if (!timerRef.current) return;

    clearInterval(timerRef.current);
    timerRef.current = null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text>Elapsed Time: </Text>
      <Text style={styles.stopwatch}>{formatHMS(elapsed)}</Text>

      <View style={{ flexDirection: "row", gap: 20 }}>
        <Button title="Start" color="#5e24ff" onPress={startTimer} />
        <Button title="Pause" color="#5e24ff" onPress={pauseTimer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ede4fc",
    alignItems: "center",
    justifyContent: "center",
  },
  stopwatch: {
    fontSize: 64,
    fontWeight: "900",
    color: "#5e24ff",
    textShadowColor: "#5e24ffa0",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
});

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState, useRef, useCallback } from "react";
import { PauseCircle, PlayCircle, StopCircle } from "lucide-react-native";

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
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setElapsed((prevElapsed) => ++prevElapsed);
    }, 1000);
    setRunning(true);
  }, [timerRef]);

  const pauseTimer = useCallback(() => {
    if (!timerRef.current) return;

    clearInterval(timerRef.current);
    timerRef.current = null;
    setRunning(false);
  }, [timerRef]);

  const resetTimer = useCallback(() => {
    setElapsed(0);
  }, [timerRef])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text>Elapsed Time: </Text>
      <Text style={styles.stopwatch}>{formatHMS(elapsed)}</Text>

      <View style={{ flexDirection: "row", gap: 20 }}>
        <Pressable onPress={startTimer}>
          <PlayCircle color='#5e24ff' size={48} />
        </Pressable>
        <Pressable onPress={running ? pauseTimer : resetTimer}>
          {running ? (
            <PauseCircle color='#5e24ff' size={48} />
          ): (
            <StopCircle color='#5e24ff' size={48} />
          )}
        </Pressable>
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

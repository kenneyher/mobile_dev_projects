import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState, useRef, useCallback, useReducer } from "react";
import { Timer, Pause, TimerReset } from "lucide-react-native";

function zeroPad(num) {
  return num < 10 ? `0${num}` : num;
}

function formatHMS(elapsed) {
  const hours = Math.floor(elapsed / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);
  const seconds = (elapsed % 3600) % 60;

  return `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`;
}

function controller(stopwatch, action) {
  switch (action.type) {
    case "stop":
      return { ...stopwatch, elapsed: 0, status: "stopped" };
    case "tick":
      return { ...stopwatch, elapsed: ++stopwatch.elapsed, status: "running" };
    case "pause":
      return { ...stopwatch, status: "paused" };
    default:
      return { ...stopwatch, status: "paused" };
  }
}

export default function App() {
  // const [elapsed, setElapsed] = useState(0);
  // const [status, setstatus] = useState(false);
  const [stopwatch, dispatch] = useReducer(controller, {
    elapsed: 0,
    status: "stopped",
  });

  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
  }, [timerRef]);

  const pauseTimer = useCallback(() => {
    if (!timerRef.current) return;

    clearInterval(timerRef.current);
    timerRef.current = null;
    dispatch({ type: "pause" });
  }, [timerRef]);

  const resetTimer = useCallback(() => {
    dispatch({ type: "stop" });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text>Elapsed Time: </Text>
      <Text style={styles.stopwatch}>{formatHMS(stopwatch.elapsed)}</Text>

      <View style={styles.actionSection}>
        <Pressable
          style={({ pressed }) =>
            stopwatch.status == "running"
              ? { ...styles.actionButton, backgroundColor: "#a8a4b3" }
              : styles.actionButton
          }
          onPress={startTimer}
          disabled={stopwatch.status == "running"}
        >
          <Timer color="#ffffff" size={16} />
          <Text style={styles.actionButtonText}>
            {stopwatch.status == "stopped"
              ? "Start"
              : "Continue"}
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) =>
            stopwatch.elapsed == 0 && stopwatch.status == "stopped"
              ? { ...styles.actionButton, backgroundColor: "#a8a4b3" }
              : styles.actionButton
          }
          onPress={stopwatch.status == "running" ? pauseTimer : resetTimer}
          disabled={stopwatch.status == "stopped" && stopwatch.elapsed === 0}
        >
          {stopwatch.status == "running" ? (
            <Pause color="#ffffff" size={16} />
          ) : (
            <TimerReset color="#ffffff" size={16} />
          )}
          <Text style={styles.actionButtonText}>
            {stopwatch.status == "running" ? "Pause" : "Reset"}
          </Text>
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
  actionSection: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
    maxHeight: 100,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  actionButton: {
    backgroundColor: "#5e24ff",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
});

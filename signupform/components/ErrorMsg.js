import { Text, StyleSheet } from "react-native";

export const ErrorMsg = ({ error }) => {
  return <Text style={styles.error}>{error}</Text>;
};

const styles = StyleSheet.create({
  error: {
    color: "#e0027cff",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
  },
});

import { Text, StyleSheet } from "react-native";

export const ErrorMsg = ({ children }) => {
  return <Text style={styles.error}>{children}</Text>;
};

const styles = StyleSheet.create({
  error: {
    color: "#c40089ff",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
  },
});

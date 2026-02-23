import { Text, StyleSheet } from "react-native";

export const Label = ({ children, ...props }) => (
  <Text style={styles.label} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: "#0f167aff",
    marginBottom: 4,
  },
});

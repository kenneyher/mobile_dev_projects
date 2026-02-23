import { View, Text, Pressable, StyleSheet } from "react-native";

export const RadioButtonGroup = ({ options, selected, onChange }) => (
  <View style={styles.radioGroup}>
    {options.map((option) => (
      <Pressable
        key={option.value}
        style={styles.radioRow}
        onPress={() => onChange(option.value)}
      >
        <View style={styles.radioOuter}>
          {selected === option.value && <View style={styles.radioInner} />}
        </View>
        <Text style={styles.radioLabel}>{option.label}</Text>
      </Pressable>
    ))}
  </View>
);

const styles = StyleSheet.create({
  radioGroup: {
    flexDirection: "row",
    gap: 24,
    marginTop: 4,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#1b32ffff",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1b32ffff",
  },
  radioLabel: {
    fontSize: 15,
    color: "#0f167aff",
  },
});

import { TextInput, StyleSheet } from "react-native";

export const NumericInput = ({
  value,
  onChange,
  placeholder,
  style,
  ...props
}) => {
  const handleChange = (text) => {
    const digits = text.replace(/[^0-9]/g, "");
    onChange(digits);
  };

  return (
    <TextInput
      style={[styles.input, style]}
      value={value}
      onChangeText={handleChange}
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      keyboardType="number-pad"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#3236ffff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: "#0f167aff",
  },
});

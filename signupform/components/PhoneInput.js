import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

// Strips spaces and dashes, then checks E.164-ish format:
// + followed by 1–3 digit country code and 6–12 digit number
export const validatePhone = (phone) => {
  const stripped = phone.replace(/[\s\-]/g, "");
  return /^\+[1-9]\d{6,14}$/.test(stripped);
};

export const PhoneInput = ({ value, onChange, error, style }) => {
  const handleChange = (text) => {
    // Always keep leading +
    let cleaned = text;

    if (!cleaned.startsWith("+")) {
      cleaned = "+" + cleaned.replace(/^\+*/, "");
    }

    // Only allow +, digits, spaces, and dashes
    cleaned = "+" + cleaned.slice(1).replace(/[^0-9\s\-]/g, "");

    onChange(cleaned);
  };

  return (
    <View>
      <TextInput
        style={[styles.input, style]}
        value={value}
        onChangeText={handleChange}
        placeholder="+1 202-555-0123"
        placeholderTextColor="#949bdaff"
        keyboardType="phone-pad"
        autoCorrect={false}
      />

      <Text style={styles.hint}>
        Include country code, e.g. +1 202-555-0123 or +50588887777
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  prefixBadge: {
    paddingHorizontal: 12,
    paddingVertical: 11,
    backgroundColor: "#E0E7FF",
    borderRightWidth: 1,
    borderRightColor: "#D1D5DB",
  },
  prefixText: { fontSize: 16 },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 15,
    color: "#111827",
  },
  hint: {
    fontSize: 11,
    color: "#949bdaff",
    marginTop: 4,
  },
});

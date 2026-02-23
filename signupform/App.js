import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  Pressable,
  View,
  Modal,
} from "react-native";
import React, { useState, useCallback, useMemo } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Label } from "./components/Label";
import { RadioButtonGroup } from "./components/RadioButtonGroup";
import { CountryPicker } from "./components/CountryPicker";
import { NumericInput } from "./components/NumericInput";
import { PhoneInput, validatePhone } from "./components/PhoneInput";
import { ErrorMsg } from "./components/ErrorMsg";

const GENRE_OPTIONS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  genre: "",
  country: "",
  age: "",
  phoneNumber: "",
  email: "",
  password: "",
};

const STATUS_COLORS = {
  Empty: "#163874ff",
  Changing: "#ff781dff",
  Incomplete: "#d3179bff",
  Ready: "#2457ffff",
};

export default function App() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const isEmpty = (form) => Object.values(form).every((value) => value === "");
  const isFilled = (form) => Object.values(form).every((value) => value !== "");

  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  const passwordRules = [
    { regex: /.{8,}/, message: "At least 8 characters" },
    { regex: /[A-Z]/, message: "At least 1 uppercase letter" },
    { regex: /[0-9]/, message: "At least 1 number" },
    { regex: /[^a-zA-Z0-9]/, message: "At least 1 special character (!@#$%…)" },
  ];

  const getPasswordErrors = (password) =>
    passwordRules
      .filter((rule) => !rule.regex.test(password))
      .map((rule) => rule.message)
      .join("\n");

  const getErrors = (form) => {
    const e = {};
    if (!form.firstName) e.firstName = "First name is required";
    if (!form.lastName) e.lastName = "Last name is required";
    if (!form.genre) e.genre = "Genre is required";
    if (!form.country) e.country = "Country is required";
    if (!form.age || form.age < 18 || form.age > 100)
      e.age = "Age must be a number between 18 and 100";
    if (!form.phoneNumber || !validatePhone(form.phoneNumber))
      e.phoneNumber = "Enter a valid international phone number";
    if (!form.email || !emailRegex.test(form.email))
      e.email = "Enter a valid email";
    const pwErrors = getPasswordErrors(form.password);
    if (pwErrors) e.password = pwErrors;
    return e;
  };

  const formStatus = useMemo(() => {
    if (isEmpty(form)) return "Empty";
    const errors = getErrors(form);
    const hasErrors = Object.keys(errors).length > 0;
    if (!hasErrors) return "Ready";
    if (isFilled(form)) return "Incomplete";
    return "Changing";
  }, [form]);

  const validateForm = useCallback(() => {
    const e = getErrors(form);
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form]);

  const handleSubmit = useCallback(() => {
    const isValid = validateForm();
    setShowModal(true);
    if (!isValid) return;
    setForm(INITIAL_FORM);
    setErrors({});
  }, [validateForm]);

  return (
    <SafeAreaProvider style={{ backgroundColor: "#eceffcff" }}>
      <SafeAreaView>
        <KeyboardAvoidingView behavior="padding">
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              <Text style={styles.title}>Sign Up</Text>
              <Label style={{ marginBottom: 25 }}>
                Form Status:{" "}
                <Text
                  style={{
                    color: STATUS_COLORS[formStatus],
                    fontWeight: "bold",
                  }}
                >
                  {formStatus}
                </Text>
              </Label>

              <View style={styles.row}>
                <View style={styles.field}>
                  <Label>First Name</Label>
                  <TextInput
                    value={form.firstName}
                    onChangeText={(text) =>
                      setForm({ ...form, firstName: text })
                    }
                    style={styles.input}
                    placeholderTextColor="#949bdaff"
                    placeholder="John"
                  />
                  {errors.firstName && <ErrorMsg>{errors.firstName}</ErrorMsg>}
                </View>
                <View style={styles.field}>
                  <Label>Last Name</Label>
                  <TextInput
                    value={form.lastName}
                    onChangeText={(text) =>
                      setForm({ ...form, lastName: text })
                    }
                    style={styles.input}
                    placeholderTextColor="#949bdaff"
                    placeholder="Doe"
                  />
                  {errors.lastName && <ErrorMsg>{errors.lastName}</ErrorMsg>}
                </View>
              </View>

              <View style={styles.field}>
                <Label>Genre</Label>
                <RadioButtonGroup
                  options={GENRE_OPTIONS}
                  selected={form.genre}
                  onChange={(value) => setForm({ ...form, genre: value })}
                />
                {errors.genre && <ErrorMsg>{errors.genre}</ErrorMsg>}
              </View>
              <View style={styles.field}>
                <Label>Country</Label>
                <CountryPicker
                  value={form.country}
                  onChange={(value) => setForm({ ...form, country: value })}
                />
                {errors.country && <ErrorMsg>{errors.country}</ErrorMsg>}
              </View>
              <View style={styles.row}>
                <View style={styles.field}>
                  <Label>Age</Label>
                  <NumericInput
                    value={form.age}
                    onChange={(value) => setForm({ ...form, age: value })}
                    maxLength={2}
                    placeholderTextColor="#949bdaff"
                    placeholder="35"
                  />
                  {errors.age && <ErrorMsg>{errors.age}</ErrorMsg>}
                </View>
                <View style={styles.field}>
                  <Label>Phone Number:</Label>
                  <PhoneInput
                    value={form.phoneNumber}
                    onChange={(value) =>
                      setForm({ ...form, phoneNumber: value })
                    }
                    error={form.phoneNumberError}
                    style={styles.input}
                  />
                  {errors.phoneNumber && (
                    <ErrorMsg>{errors.phoneNumber}</ErrorMsg>
                  )}
                </View>
              </View>
              <View style={styles.field}>
                <Label>Email</Label>
                <TextInput
                  value={form.email}
                  onChangeText={(text) => setForm({ ...form, email: text })}
                  style={styles.input}
                  keyboardType="email-address"
                  placeholderTextColor="#949bdaff"
                  placeholder="john@example.com"
                />
                {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
              </View>
              <View style={styles.field}>
                <Label>Password</Label>
                <TextInput
                  value={form.password}
                  onChangeText={(text) => setForm({ ...form, password: text })}
                  style={styles.input}
                  secureTextEntry
                  placeholderTextColor="#949bdaff"
                  placeholder="********"
                />
                {errors.password && <ErrorMsg>{errors.password}</ErrorMsg>}
              </View>
              <Pressable style={styles.submit} onPress={handleSubmit}>
                <Text style={styles.submitTxt}>Sign Up</Text>
              </Pressable>
            </View>

            <Modal visible={showModal} transparent={true} animationType="slide">
              <View style={styles.container}>
                <View style={styles.modal}>
                  {Object.keys(errors).length > 0 && (
                    <View>
                      <View>
                        <Text style={styles.title}>Uh-oh!</Text>
                        <Text style={styles.accent}>
                          It seems your form has some errors.
                        </Text>
                      </View>
                      <Pressable
                        style={[styles.submit, { alignSelf: "flex-end" }]}
                        onPress={() => setShowModal(false)}
                      >
                        <Text style={styles.submitTxt}>Fix them</Text>
                      </Pressable>
                    </View>
                  )}
                  {Object.keys(errors).length === 0 && (
                    <View>
                      <View>
                        <Text style={styles.title}>Success!</Text>
                        <Text style={styles.accent}>
                          Your form has been submitted successfully.
                        </Text>
                      </View>

                      <Pressable
                        style={[styles.submit, { alignSelf: "flex-end" }]}
                        onPress={() => {
                          setShowModal(false);
                          setForm(INITIAL_FORM);
                        }}
                      >
                        <Text style={styles.submitTxt}>OK</Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              </View>
            </Modal>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "#e6e9ffff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: { padding: 24, paddingBottom: 48 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1b32ffff",
  },
  accent: {
    color: "#3236ffff",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    gap: 20,
  },
  field: {
    flex: 1,
    marginBottom: 16,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#3236ffff",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: "#252858ff",
  },
  submit: {
    backgroundColor: "#3236ffff",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  submitTxt: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

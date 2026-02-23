import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  FlatList,
} from "react-native";

const API_URL = "https://restcountries.com/v3.1/all?fields=name,flags,cca2";

export const CountryPicker = ({ value, onChange }) => {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          .map((c) => ({
            code: c.cca2,
            name: c.name.common,
            flag: c.flags?.emoji ?? "🏳",
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(sorted);
        setFiltered(sorted);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = useCallback(
    (text) => {
      setSearch(text);
      setFiltered(
        countries.filter((c) =>
          c.name.toLowerCase().includes(text.toLowerCase()),
        ),
      );
    },
    [countries],
  );

  const handleSelect = (country) => {
    onChange(country);
    setModalVisible(false);
    setSearch("");
    setFiltered(countries);
  };

  const handleClose = () => {
    setModalVisible(false);
    setSearch("");
    setFiltered(countries);
  };

  return (
    <>
      <Pressable
        style={styles.trigger}
        onPress={() => setModalVisible(true)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#6366F1" />
        ) : (
          <>
            <Text
              style={value ? styles.triggerText : styles.triggerPlaceholder}
            >
              {value ? `${value.flag}  ${value.name}` : "Select a country..."}
            </Text>
            <Text style={styles.chevron}>▾</Text>
          </>
        )}
      </Pressable>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={handleClose}
      >
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Select Country</Text>
            <Pressable onPress={handleClose} hitSlop={10}>
              <Text style={styles.closeBtn}>✕</Text>
            </Pressable>
          </View>

          {/* Search */}
          <View style={styles.searchWrapper}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search country..."
              placeholderTextColor="#9CA3AF"
              value={search}
              onChangeText={handleSearch}
              autoFocus
              clearButtonMode="while-editing"
            />
          </View>

          {/* Results count */}
          <Text style={styles.resultsCount}>
            {filtered.length} countr{filtered.length === 1 ? "y" : "ies"}
          </Text>

          {/* List */}
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => {
              const isSelected = value?.code === item.code;
              return (
                <Pressable
                  style={[styles.row, isSelected && styles.rowSelected]}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.flag}>{item.flag}</Text>
                  <Text
                    style={[
                      styles.countryName,
                      isSelected && styles.countryNameSelected,
                    ]}
                  >
                    {item.name}
                  </Text>
                  {isSelected && <Text style={styles.checkmark}>✓</Text>}
                </Pressable>
              );
            }}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <View style={styles.emptyWrapper}>
                <Text style={styles.emptyText}>No countries found</Text>
                <Text style={styles.emptySubText}>Try a different search</Text>
              </View>
            }
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#4662ffff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 46,
  },
  triggerText: { fontSize: 15, color: "#0e224dff" },
  triggerPlaceholder: { fontSize: 15, color: "#8e95d1ff" },
  chevron: { fontSize: 16, color: "#2143d8ff" },

  modal: { flex: 1, backgroundColor: "#f1f3ffff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#384cffff",
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#0d2455ff" },
  closeBtn: { fontSize: 18, color: "#3075ffff" },

  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#2736ffff",
    borderRadius: 10,
    gap: 8,
  },
  searchIcon: { fontSize: 16 },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 15,
    color: "#0d214dff",
  },
  resultsCount: {
    fontSize: 12,
    color: "#7b8aa5ff",
    paddingHorizontal: 16,
    marginBottom: 4,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#dcdbf7ff",
    gap: 12,
  },
  rowSelected: { backgroundColor: "#c2cbe7ff" },
  flag: { fontSize: 22 },
  countryName: { flex: 1, fontSize: 15, color: "#0c1952ff" },
  countryNameSelected: { color: "#3023dfff", fontWeight: "600" },
  checkmark: { fontSize: 16, color: "#191cd3ff" },

  emptyWrapper: { alignItems: "center", paddingTop: 60, gap: 8 },
  emptyText: { fontSize: 16, fontWeight: "600", color: "#6d7d97ff" },
  emptySubText: { fontSize: 14, color: "#798497ff" },
});

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS, RADIUS } from "../theme";

export default function DevicePicker({ onSelect }) {
  const [deviceId, setDeviceId] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Выбор устройства и даты</Text>
      <TextInput
        style={styles.input}
        placeholder="Device ID"
        value={deviceId}
        onChangeText={setDeviceId}
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShow(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.dateButtonText}>📅 {date.toISOString().slice(0, 10)}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      <TouchableOpacity
        style={[
          styles.button,
          (!deviceId) && styles.buttonDisabled
        ]}
        onPress={() => onSelect(deviceId, date.toISOString().slice(0, 10))}
        disabled={!deviceId}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Показать карту</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 64,
    backgroundColor: "#fff",
    padding: 26,
    borderRadius: RADIUS * 1.3,
    alignItems: "center",
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  title: { fontWeight: "bold", fontSize: 20, color: COLORS.text, marginBottom: 16 },
  input: { borderWidth: 1, borderColor: COLORS.primary, backgroundColor: "#f8fafd", borderRadius: RADIUS, width: 220, marginBottom: 18, padding: 12, fontSize: 16, color: COLORS.text },
  dateButton: { backgroundColor: "#eaf5fb", borderRadius: RADIUS, padding: 13, marginBottom: 16, width: 180, alignItems: "center" },
  dateButtonText: { color: COLORS.primary, fontWeight: "bold", fontSize: 15 },
  button: { backgroundColor: COLORS.accent, paddingVertical: 13, borderRadius: RADIUS, alignItems: "center", width: 180, marginTop: 8 },
  buttonDisabled: { backgroundColor: "#aaa" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 17 },
});

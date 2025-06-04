import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function DeviceInput({ onSelect }) {
  const [deviceId, setDeviceId] = useState('');
  const [date, setDate] = useState('');
  return (
    <View style={{ margin: 24, alignItems: 'center' }}>
      <Text style={{ fontWeight: 'bold' }}>Введите Device ID</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, width: 250, marginBottom: 12, padding: 8 }}
        placeholder="Device ID"
        value={deviceId}
        onChangeText={setDeviceId}
        autoCapitalize="none"
      />
      <Text style={{ fontWeight: 'bold' }}>Дата (YYYY-MM-DD)</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, width: 250, marginBottom: 12, padding: 8 }}
        placeholder="2025-06-04"
        value={date}
        onChangeText={setDate}
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={() => onSelect(deviceId, date)}
        style={{ backgroundColor: '#2196f3', borderRadius: 8, padding: 12, width: 220, alignItems: 'center' }}>
        <Text style={{ color: '#fff' }}>Показать карту</Text>
      </TouchableOpacity>
    </View>
  );
}

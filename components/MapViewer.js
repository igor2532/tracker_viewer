import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { getHistory } from "../api";
import { COLORS } from "../theme";

export default function MapViewer({ deviceId, date }) {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getHistory(deviceId, date).then(data => {
      setPoints(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, [deviceId, date]);

  if (loading) return <ActivityIndicator style={{ marginTop: 80 }} size="large" color={COLORS.primary} />;
  if (!points.length) return (
    <Text style={{ marginTop: 120, color: COLORS.error, textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
      Нет данных за выбранную дату
    </Text>
  );

  const first = points[0];
  if (!first) return null;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: first.latitude || 0,
          longitude: first.longitude || 0,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}>
        {points.map((pt, i) => (
          <Marker
            key={i}
            coordinate={{ latitude: pt.latitude, longitude: pt.longitude }}
            title={i === points.length - 1 ? "Последняя точка" : `Точка ${i + 1}`}
            pinColor={i === points.length - 1 ? COLORS.accent : COLORS.primary}
          />
        ))}
        <Polyline
          coordinates={points.map(pt => ({ latitude: pt.latitude, longitude: pt.longitude }))}
          strokeColor={COLORS.primary}
          strokeWidth={4}
        />
      </MapView>
    </View>
  );
}

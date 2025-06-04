import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { getHistory } from '../api';

export default function MapScreen({ deviceId, date }) {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getHistory(deviceId, date).then(data => {
      setPoints(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, [deviceId, date]);

  if (loading) return <ActivityIndicator style={{ marginTop: 100 }} size="large" />;
  if (!points.length) return <Text style={{ marginTop: 100, color: 'red', textAlign: 'center' }}>Нет данных за выбранную дату</Text>;

  const first = points[0];
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
        initialRegion={{
          latitude: first.latitude,
          longitude: first.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}>
        {points.map((pt, i) => (
          <Marker key={i} coordinate={{ latitude: pt.latitude, longitude: pt.longitude }} />
        ))}
        <Polyline
          coordinates={points.map(pt => ({ latitude: pt.latitude, longitude: pt.longitude }))}
          strokeColor="#1976D2"
          strokeWidth={3}
        />
      </MapView>
    </View>
  );
}

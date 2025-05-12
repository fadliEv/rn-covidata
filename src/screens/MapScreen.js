import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const handleNext = () => {
    if (!selectedLocation) {
      Alert.alert('Lokasi belum dipilih', 'Silakan tap pada peta untuk memilih lokasi terlebih dahulu.');
      return;
    }

    // Navigasi ke halaman berikutnya dengan data lokasi
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home', params: { lat: selectedLocation.latitude, lng: selectedLocation.longitude } }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        Tap pada peta untuk memilih lokasi Anda.
      </Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -6.2,
          longitude: 106.816666,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Lokasi dipilih"
            pinColor="blue"
          />
        )}
      </MapView>

      {selectedLocation && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoText: {
    padding: 12,
    backgroundColor: '#E0F7F7',
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  map: {
    flex: 1,
  },
  nextButton: {
    backgroundColor: '#077A7D',
    paddingVertical: 14,
    borderRadius: 10,
    margin: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

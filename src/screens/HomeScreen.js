import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Image,
  Alert
} from 'react-native';
import DataCard from '../components/DataCard';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import * as Location from 'expo-location';


export default function HomeScreen({ navigation, route }) {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Tangkap lokasi dari MapScreen (opsional)
  const selectedLat = route?.params?.lat;
  const selectedLng = route?.params?.lng;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://192.168.18.62:8080/users');
      setDataList(response.data);
    } catch (error) {
      console.error("Error Get Users", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(fetchUsers, 700);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUsers();
    }, [])
  );

  const handleLogout = () => {
    Alert.alert('Logout', 'Apakah Anda yakin ingin keluar?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Auth' }] }),
      },
    ]);
  };

  useEffect(() => {
    const fetchAddress = async () => {
      if (route?.params?.lat && route?.params?.lng) {
        try {
          const [place] = await Location.reverseGeocodeAsync({
            latitude: route.params.lat,
            longitude: route.params.lng,
          });
  
          const city = place.city || place.region || place.name || 'Lokasi tidak diketahui';
          const country = place.country || '';
  
          setSelectedAddress(`${city}, ${country}`);
        } catch (err) {
          console.error('Gagal reverse geocode:', err);
          setSelectedAddress('Tidak dapat menentukan lokasi');
        }
      }
    };
  
    fetchAddress();
  }, [route]);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Image source={require('../../assets/covid-logo.png')} style={styles.logo} />
          <Text style={styles.subtitle}>
            Pendataan masyarakat terdampak COVID-19
          </Text>
        </View>

        {selectedAddress && (
          <View style={styles.locationBox}>
            <Ionicons name="location-outline" size={18} color="#077A7D" />
            <Text style={styles.locationText}>
              Lokasi dipilih: {selectedAddress}
            </Text>
          </View>
        )}


        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={24} color="#ffffff" />
          <Text style={styles.infoText}>
            Pastikan data yang Anda input akurat untuk membantu penanganan COVID-19.
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Daftar Data Warga</Text>

          <View style={styles.rightActions}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('AddData')}
            >
              <Ionicons name="add-circle" size={28} color="#077A7D" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={26} color="#E63946" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#077A7D" />
          <Text style={styles.loadingText}>Loading data...</Text>
        </View>
      ) : (
        <FlatList
          data={dataList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ paddingHorizontal: 16 }}>
              <DataCard
                item={item}
                onPress={() => navigation.navigate('Detail', { data: item })}
              />
            </View>
          )}
          style={styles.listArea}
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F9F8',
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 4,
  },
  infoBox: {
    backgroundColor: '#34A0A4',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    color: '#ffffff',
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#077A7D',
  },
  addButton: {
    marginLeft: 8,
  },
  listArea: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#077A7D',
    marginTop: 12,
    fontSize: 18,
  },
  logo: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 12,
  },
  locationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: '#E0F7F7',
    borderRadius: 8,
  },
  locationText: {
    color: '#077A7D',
    marginLeft: 6,
    fontSize: 13,
  },
});

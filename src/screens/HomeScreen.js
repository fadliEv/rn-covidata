import { View, FlatList, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, Image } from 'react-native';
import DataCard from '../components/DataCard';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk loading
  const [refreshing, setRefreshing] = useState(false); // State untuk refresh

  // Fetch users from backend API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://192.168.18.62:8080/users'); // ip device ya
      setDataList(response.data);
      setLoading(false);
      setRefreshing(false); // Stop refreshing after fetch
    } catch (error) {
      console.error("Error Get Users", error);
      setLoading(false); // Jika error, hentikan loading
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true); 
    setTimeout(() => {
      fetchUsers(); 
    }, 700); 
  };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

useFocusEffect(
   React.useCallback(() => {
     fetchUsers();
   }, [])
 );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER STATIC */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
        <Image
            source={require('../../assets/covid-logo.png')}
            style={styles.logo}
        />          
          <Text style={styles.subtitle}>
            Pendataan masyarakat terdampak COVID-19
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={24} color="#ffffff" />
          <Text style={styles.infoText}>
            Pastikan data yang Anda input akurat untuk membantu penanganan COVID-19.
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Daftar Data Warga</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddData')}
          >
            <Ionicons name="add-circle" size={28} color="#077A7D" />
          </TouchableOpacity>
        </View>
      </View>

      {/* LOADING INDICATOR */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#077A7D" />
          <Text style={styles.loadingText}>Loading data...</Text>
        </View>
      ) : (
        // LIST SCROLLABLE
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
          refreshing={refreshing} // Show loading spinner when refreshing
          onRefresh={handleRefresh} // Trigger fetch on pull to refresh
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
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#077A7D',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
    marginTop: 4,
  },
  infoBox: {
    backgroundColor: '#34A0A4',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
    marginBottom: 10,
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
});

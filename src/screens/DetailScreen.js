import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function DetailScreen({ route,navigation }) {
  const { data } = route.params;

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Terkonfirmasi':
        return styles.badgeConfirmed;
      case 'Dalam Perawatan':
        return styles.badgeTreatment;
      case 'Sembuh':
        return styles.badgeRecovered;
      default:
        return styles.badgeDefault;
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Konfirmasi Hapus",
      "Apakah Anda yakin ingin menghapus data ini?",
      [
        { text: "Batal", style: "cancel" },
        { 
          text: "Hapus", 
          style: "destructive", 
          onPress: async () => {
            try {
              await axios.delete(`http://192.168.18.62:8080/users/${data.id}`);
              Alert.alert("Sukses", "Data berhasil dihapus");
              navigation.goBack(); // Kembali ke HomeScreen setelah hapus
            } catch (error) {
              console.error("Error delete user", error);
              Alert.alert("Error", "Gagal menghapus data");
            }
          } 
        }
      ]
    );
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={80} color="#077A7D" />
        <Text style={styles.name}>{data.name}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={20} color="#34A0A4" />
          <Text style={styles.infoText}>Usia: {data.age} tahun</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="medkit-outline" size={20} color="#34A0A4" />
          <Text style={styles.infoText}>Status:</Text>
          <View style={[styles.badge, getStatusBadgeStyle(data.status)]}>
            <Text style={styles.badgeText}>{data.status}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={20} color="#34A0A4" />
          <Text style={styles.infoText}>Lokasi: {data.location}</Text>
        </View>
      </View>

      <View style={styles.descriptionBox}>
        <Text style={styles.descriptionText}>
          Informasi ini digunakan untuk pemantauan dan upaya penanganan masyarakat yang terdampak COVID-19.
        </Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('AddData', { data, mode: 'edit' })}>
            <Ionicons name="create-outline" size={20} color="#ffffff" />
            <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={20} color="#ffffff" />
            <Text style={styles.buttonText}>Hapus</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9F8',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#077A7D',
    marginTop: 8,
  },
  infoContainer: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    flexWrap: 'wrap',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
    marginRight: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  badgeConfirmed: {
    backgroundColor: '#E63946',
  },
  badgeTreatment: {
    backgroundColor: '#F4A261',
  },
  badgeRecovered: {
    backgroundColor: '#2A9D8F',
  },
  badgeDefault: {
    backgroundColor: '#6c757d',
  },
  descriptionBox: {
    backgroundColor: '#E0F7F7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  descriptionText: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#077A7D',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E63946',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginLeft: 8,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});

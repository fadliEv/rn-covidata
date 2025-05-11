import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DataCard({ item, onPress }) {
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

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <Ionicons name="person-circle-outline" size={36} color="#077A7D" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.subInfo}>{item.location}</Text>
        </View>
      </View>

      <View style={styles.detailRow}>
        <Ionicons name="calendar-outline" size={18} color="#34A0A4" />
        <Text style={styles.detailText}>Usia: {item.age} tahun</Text>
      </View>

      <View style={styles.detailRow}>
        <Ionicons name="medkit-outline" size={18} color="#34A0A4" />
        <Text style={styles.detailText}>
          Status: 
        </Text>
        <View style={[styles.badge, getStatusBadgeStyle(item.status)]}>
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.descriptionBox}>
        <Text style={styles.description}>
          Data ini tercatat untuk monitoring dan tindak lanjut kesehatan COVID-19.
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,    
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#077A7D',
  },
  subInfo: {
    fontSize: 14,
    color: '#555',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    flexWrap: 'wrap',
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    marginRight: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
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
    marginTop: 12,
    backgroundColor: '#E0F7F7',
    padding: 10,
    borderRadius: 8,
  },
  description: {
    fontSize: 12,
    color: '#555',
    fontStyle: 'italic',
  },
});

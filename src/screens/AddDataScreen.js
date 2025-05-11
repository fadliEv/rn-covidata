import { View, TextInput, TouchableOpacity, Text, StyleSheet, Platform, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

export default function AddDataScreen({ navigation,route  }) {
  const { data, mode } = route.params || {};

  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [age, setAge] = useState(null); 

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [items, setItems] = useState([
    { label: 'Terkonfirmasi', value: 'Terkonfirmasi' },
    { label: 'Dalam Perawatan', value: 'Dalam Perawatan' },
    { label: 'Sembuh', value: 'Sembuh' },
  ]);

  // Handle form submission
  const handleSubmit = async () => {
    if (!name || !status || !location || (!birthDate && mode !== 'edit')) {
      setErrorMessage('Semua field wajib diisi!');
      return;
    }
  
    const newData = {
      name,
      age,
      status,
      location,
    };
  
    try {
      if (mode === 'edit' && data?.id) {
        // Kalau edit, PUT request
        await axios.put('http://192.168.18.62:8080/users', { id: data.id, ...newData });
        Alert.alert('Success', 'Data berhasil diperbarui');
      } else {
        // Kalau tambah baru, POST request
        await axios.post('http://192.168.18.62:8080/users', newData);
        Alert.alert('Success', 'Data berhasil ditambahkan');
      }
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving user:', error);
      Alert.alert('Error', 'Gagal menyimpan data. Coba lagi.');
    }
  };

  // Calculate age based on birthdate
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    setAge(age); // Update the age state
    return age;
  };

  // Handle date picker change
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(false);
    setBirthDate(currentDate);
    calculateAge(currentDate); 
  };

  useEffect(() => {
    if (mode === 'edit' && data) {
      setName(data.name);
      setAge(data.age);
      setLocation(data.location);
      setStatus(data.status);
      // Tanggal lahir tidak bisa dibalik dari umur, biarkan kosong saja
    }
  }, [data, mode]);

  return (
    <View style={styles.container}>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <Text style={styles.label}>Nama</Text>
      <View style={styles.inputGroup}>
        <Ionicons name="person-outline" size={20} color="#34A0A4" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Masukkan nama lengkap"
          value={name}
          onChangeText={(text) => {
            setName(text);
            setErrorMessage('');
          }}
        />
      </View>

      {/* Tanggal Lahir */}
      <Text style={styles.label}>Tanggal Lahir</Text>
      <View style={styles.dateGroup}>
        <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker(true)}>
          <Ionicons name="calendar-outline" size={20} color="#34A0A4" style={styles.icon} />
          <Text style={[styles.input, { color: birthDate ? '#333' : '#999' }]}>
            {birthDate ? birthDate.toLocaleDateString() : 'Pilih tanggal lahir'}
          </Text>
        </TouchableOpacity>
        <TextInput
          style={styles.ageInput}
          placeholder="Usia"
          value={age ? age.toString() : ''}
          editable={false} // Make this input readonly
        />
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={birthDate || new Date(2000, 0, 1)}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeDate}
          maximumDate={new Date()}
        />
      )}

      {/* Dropdown Status */}
      <View style={{ marginBottom: open ? 160 : 20 }}>
        <Text style={styles.label}>Status</Text>
        <DropDownPicker
          open={open}
          value={status}
          items={items}
          setOpen={setOpen}
          setValue={setStatus}
          setItems={setItems}
          placeholder="Pilih status pasien"
          style={styles.dropdownOnly}
          dropDownContainerStyle={styles.dropdownContainer}
          placeholderStyle={{ color: '#999' }}
          textStyle={{ fontSize: 16 }}
          onOpen={() => setErrorMessage('')}
        />
      </View>

      {/* Input Lokasi */}
      <Text style={styles.label}>Lokasi</Text>
      <View style={styles.inputGroup}>
        <Ionicons name="location-outline" size={20} color="#34A0A4" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Masukkan kota tempat tinggal"
          value={location}
          onChangeText={(text) => {
            setLocation(text);
            setErrorMessage('');
          }}
        />
      </View>

      {/* Tombol Simpan */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Ionicons name="save-outline" size={20} color="#fff" />
        <Text style={styles.saveButtonText}>Simpan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9F8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#077A7D',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorText: {
    color: '#E63946',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#077A7D',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 50,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  dateGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#077A7D',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 50,
  },
  ageInput: {
    backgroundColor: '#ffffff',
    borderColor: '#077A7D',
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#999',  
    marginLeft: 12,
    width: 80,
    textAlign: 'center',
  },
  dropdownOnly: {
    backgroundColor: '#ffffff',
    borderColor: '#077A7D',
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderColor: '#077A7D',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#077A7D',
    paddingVertical: 14,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#077A7D',
    marginBottom: 6,
  },
});


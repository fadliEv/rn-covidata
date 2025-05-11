// screens/RegisterScreen.js

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { users, addUser } from '../utils/authDummy';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fungsi validasi password dan konfirmasi password
  const validateForm = () => {
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage('Semua field harus diisi!');
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Password dan Konfirmasi Password tidak cocok!');
      return false;
    }
    return true;
  };

  // Fungsi untuk menangani registrasi
  const handleRegister = () => {
    if (!validateForm()) return;

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      status: 'Terkonfirmasi',
    };

    addUser(newUser); // Menambahkan user baru ke data dummy
    Alert.alert('Registrasi Sukses', `Akun baru telah dibuat dengan email: ${email}`);
    navigation.goBack(); // Kembali ke halaman AuthScreen setelah registrasi
  };

  return (
    <View style={styles.container}>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <Text style={styles.title}>Daftar Akun Baru</Text>

      <TextInput
        style={styles.input}
        placeholder="Nama Lengkap"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Konfirmasi Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Daftar</Text>
      </TouchableOpacity>

      {/* Tombol Kembali ke Halaman Login */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Sudah punya akun? Login di sini</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F9F8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#077A7D',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#077A7D',
    borderWidth: 1,
    marginBottom: 12,
  },
  registerButton: {
    backgroundColor: '#077A7D',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: '#E63946',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  backText: {
    color: '#077A7D',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 16,
  },
});

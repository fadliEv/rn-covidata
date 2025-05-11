// screens/AuthScreen.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { users } from '../utils/authDummy';

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fungsi untuk login menggunakan akun Google
  const handleGoogleLogin = () => {
    const dummyUser = users.find((user) => user.email === 'john.doe@gmail.com'); // Dummy login
    if (dummyUser) {
      Alert.alert('Login Sukses', `Welcome ${dummyUser.name}!`);
      navigation.navigate('Home');
    } else {
      Alert.alert('Gagal', 'Akun tidak ditemukan');
    }
  };

  // Fungsi untuk login menggunakan email dan password
  const handleEmailLogin = () => {
    const dummyUser = users.find((user) => user.email === email && user.password === password);
    if (dummyUser) {
      Alert.alert('Login Sukses', `Welcome ${dummyUser.name}!`);
      navigation.navigate('Home');
    } else {
      Alert.alert('Gagal', 'Email atau password salah');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo Aplikasi */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/covid-logo.png')}
          style={styles.logo}
        />        
      </View>

      {/* Deskripsi Pengantar */}
      <Text style={styles.description}>
        Aplikasi untuk pendataan masyarakat terdampak COVID-19.
        <Text style={styles.descriptionHighlight}> Masuk untuk melanjutkan</Text>
      </Text>

      {/* Button Login with Google */}
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Ionicons name="logo-google" size={24} color="#fff" />
        <Text style={styles.buttonText}>Login dengan Google</Text>
      </TouchableOpacity>

      {/* Form Login dengan Email dan Password */}
      <Text style={styles.orText}>Atau</Text>
      
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

      <TouchableOpacity style={styles.loginButton} onPress={handleEmailLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Tombol Navigasi ke Halaman Registrasi */}
      <Text style={styles.orText}>Belum punya akun?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Daftar Akun Baru</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Covidata, All Rights Reserved</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop : 80,
    backgroundColor: '#F5F9F8',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#077A7D',
    marginTop: 12,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 40,
  },
  descriptionHighlight: {
    fontWeight: 'bold',
    color: '#077A7D',
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#EA4335',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  orText: {
    fontSize: 14,
    color: '#777',
    marginVertical: 12,
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
  loginButton: {
    backgroundColor: '#077A7D',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  registerText: {
    color: '#077A7D',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#777',
  },
});

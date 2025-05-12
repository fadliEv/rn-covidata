// screens/AuthScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { users } from '../utils/authDummy';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
  });
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '161935605768-ibs75nm4f07bfgp9hvvcb70e84t2nu03.apps.googleusercontent.com',
    iosClientId: '161935605768-m3j57bodm8j4ln55c7begd2f0p2dgdh2.apps.googleusercontent.com',
    redirectUri: redirectUri,
    useProxy: true,
  });  
  

  // Handle response dari Google Sign-In
  useEffect(() => {
      console.log('Redirect URI:', redirectUri);
    if (response?.type === 'success') {
      const { authentication } = response;

      fetchUserInfo(authentication.accessToken);
    }
  }, [response]);

  const fetchUserInfo = async (token) => {
    try {
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await res.json();

      Alert.alert('Login Sukses', `Selamat datang, ${user.name}`);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error fetching Google user info:', error);
      Alert.alert('Gagal', 'Tidak bisa mengambil data akun Google');
    }
  };

  const handleGoogleLogin = () => {
    promptAsync();
  };

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

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan email"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleEmailLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Tombol Navigasi ke Halaman Registrasi */}
      <View style={styles.registerSection}>
        <Text style={styles.orText}>Belum punya akun?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Daftar</Text>
        </TouchableOpacity>
      </View>

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
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
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
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
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
    marginBottom: 16,
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
    marginVertical: 8,
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
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#077A7D',
    marginBottom: 6,
    alignSelf: 'flex-start',
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
  registerSection: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  registerText: {
    color: '#077A7D',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 6,
    textDecorationLine: 'underline',
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

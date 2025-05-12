import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import AddDataScreen from '../screens/AddDataScreen';
import AuthScreen from '../screens/AuthScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MapScreen from '../screens/MapScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ title: 'Autentikasi',headerShown : false }}
        />
          <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Daftar Akun Baru',headerShown : false  }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ title: 'Peta COVID-19' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Covidata - Data Warga' ,headerShown : false}}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: 'Detail Data' }}
        />
        <Stack.Screen
          name="AddData"
          component={AddDataScreen}
          options={{ title: 'Tambah Data' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

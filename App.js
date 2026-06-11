import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TrainingProvider, TrainingContext } from './context/TrainingContext';
import { Ionicons } from '@expo/vector-icons';
import Header from './components/Header';

import HomeScreen from './screens/HomeScreen';
import AgendaScreen from './screens/AgendaScreen';
import CadastroScreen from './screens/CadastroScreen';
import InstrutoresScreen from './screens/InstrutoresScreen';
import GestaoScreen from './screens/GestaoScreen';
import CertificadoScreen from './screens/CertificadoScreen';
import NotificacoesScreen from './screens/NotificacoesScreen';
import LoginScreen from './screens/LoginScreen';
import AvaliacaoScreen from './screens/AvaliacaoScreen';
import UsuariosScreen from './screens/UsuariosScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Componente de abas principais que mostra diferentes seções conforme o papel do usuário
function MainTabs({ navigation }) {
  const { user, setUser } = useContext(TrainingContext); // Recupera dados do usuário logado

  useEffect(() => {
    if (!user) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  }, [navigation, user]);

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f3ff' }}>
      <Header 
        title="Gestão de Treinamentos" 
        subtitle={`Usuário: ${user ? user.role : ''}`} 
        onLogout={handleLogout} 
      />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Agenda') iconName = focused ? 'calendar' : 'calendar-outline';
            else if (route.name === 'Cadastro') iconName = focused ? 'build' : 'build-outline';
            else if (route.name === 'Gestão') iconName = focused ? 'people' : 'people-outline';
            else if (route.name === 'Certificados') iconName = focused ? 'ribbon' : 'ribbon-outline';
            else if (route.name === 'Notificações') iconName = focused ? 'notifications' : 'notifications-outline';
            else if (route.name === 'Instrutores') iconName = focused ? 'person-add' : 'person-add-outline';
            else if (route.name === 'Usuários') iconName = focused ? 'settings' : 'settings-outline';
            
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4f46e5', // Roxo principal
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopColor: '#e2e8f0',
          }
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Agenda" component={AgendaScreen} />
        {user && ['Organizador', 'Administrador'].includes(user.role) && <Tab.Screen name="Cadastro" component={CadastroScreen} />}
        {user && ['Organizador', 'Administrador'].includes(user.role) && <Tab.Screen name="Instrutores" component={InstrutoresScreen} />}
        {user && user.role === 'Administrador' && <Tab.Screen name="Usuários" component={UsuariosScreen} />}
        {user && ['Instrutor', 'Organizador', 'Gestor', 'Administrador'].includes(user.role) && <Tab.Screen name="Gestão" component={GestaoScreen} />}
        <Tab.Screen name="Certificados" component={CertificadoScreen} />
        <Tab.Screen name="Notificações" component={NotificacoesScreen} />
      </Tab.Navigator>
    </View>
  );
}

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f5f3ff', // Fundo principal roxinho claro
  },
};

// Componente raiz da aplicação que envolve navegação e contexto
export default function App() {
  return (
    <TrainingProvider>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f5f3ff' } }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="Avaliacao" component={AvaliacaoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TrainingProvider>
  );
}
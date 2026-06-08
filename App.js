import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TrainingProvider, TrainingContext } from './context/TrainingContext';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import AgendaScreen from './screens/AgendaScreen';
import CadastroScreen from './screens/CadastroScreen';
import InstrutoresScreen from './screens/InstrutoresScreen';
import GestaoScreen from './screens/GestaoScreen';
import CertificadoScreen from './screens/CertificadoScreen';
import NotificacoesScreen from './screens/NotificacoesScreen';
import LoginScreen from './screens/LoginScreen';
import AvaliacaoScreen from './screens/AvaliacaoScreen';

// Cria os navegadores de pilha (Stack) e abas (Tab)
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Componente de abas principais que mostra diferentes seções conforme o papel do usuário
function MainTabs() {
  const { user } = useContext(TrainingContext); // Recupera dados do usuário logado
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Agenda') iconName = focused ? 'calendar' : 'calendar-outline';
          else if (route.name === 'Cadastro') iconName = focused ? 'build' : 'build-outline';
          else if (route.name === 'Gestão') iconName = focused ? 'people' : 'people-outline';
          else if (route.name === 'Certificados') iconName = focused ? 'ribbon' : 'ribbon-outline';
          else if (route.name === 'Notificações') iconName = focused ? 'notifications' : 'notifications-outline';
          else if (route.name === 'Instrutores') iconName = focused ? 'person-add' : 'person-add-outline';
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#7c3aed',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Agenda" component={AgendaScreen} />
      {/* Exibe abas de cadastro e instrutores apenas para roles específicos */}
      {(user.role === 'Organizador' || user.role === 'Administrador') && <Tab.Screen name="Cadastro" component={CadastroScreen} />}
      {(user.role === 'Organizador' || user.role === 'Administrador') && <Tab.Screen name="Instrutores" component={InstrutoresScreen} />}
      <Tab.Screen name="Gestão" component={GestaoScreen} />
      <Tab.Screen name="Certificados" component={CertificadoScreen} />
      <Tab.Screen name="Notificações" component={NotificacoesScreen} />
    </Tab.Navigator>
  );
}

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

// Componente raiz da aplicação que envolve navegação e contexto
export default function App() {
  return (
    <TrainingProvider>
      <LinearGradient 
        colors={['#e9d5ff', '#f8fafc']} 
        start={{ x: 0, y: 1 }} 
        end={{ x: 0, y: 0 }} 
        style={{ flex: 1 }}
      >
        <NavigationContainer theme={navTheme}>
          <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: 'transparent' } }}>
            <Stack.Screen 
            name="Login" 
            component={LoginScreen}
          />

          <Stack.Screen 
          name="Main" 
          component={MainTabs} 
          />

          <Stack.Screen 
          name="Avaliacao" 
          component={AvaliacaoScreen} 
          />

        </Stack.Navigator>
      </NavigationContainer>
      </LinearGradient>
    </TrainingProvider>
  );
}
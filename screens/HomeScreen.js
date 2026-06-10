import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from './Styles/globalStyles';
import { TrainingContext } from '../context/TrainingContext';

export default function HomeScreen({ navigation }) {
  const { treinamentos, user } = useContext(TrainingContext);

  if (!user) {
    return null;
  }
  
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Bem-vindo, {user.nome}</Text>
      
      <TouchableOpacity style={globalStyles.card} onPress={() => navigation.navigate('Agenda')}>
        <Text style={{fontWeight: 'bold', fontSize: 18, color: '#1e1b4b'}}>Visão Geral</Text>
        <Text style={{marginTop: 5, color: '#64748b'}}>Total de treinamentos no sistema: <Text style={{fontWeight: 'bold', color: '#4f46e5'}}>{treinamentos.length}</Text></Text>
      </TouchableOpacity>

      <View style={globalStyles.card}>
        <Text style={{fontWeight: 'bold', fontSize: 18, color: '#1e1b4b'}}>Status do Perfil</Text>
        <Text style={{marginTop: 5, color: '#64748b'}}>Seu nível de acesso:</Text>
        <View style={[globalStyles.pill, { marginTop: 10 }]}>
          <Text style={globalStyles.pillText}>{user.role}</Text>
        </View>
      </View>
    </View>
  );
}
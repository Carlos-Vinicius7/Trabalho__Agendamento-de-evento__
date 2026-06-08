import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from './Styles/globalStyles';
import { TrainingContext } from '../context/TrainingContext';

// Tela inicial que mostra informações gerais e navegação rápida
export default function HomeScreen({ navigation }) {
  const { treinamentos, user } = useContext(TrainingContext); // obtém dados do contexto global
  
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Bem-vindo, {user.nome}</Text>
      
      <TouchableOpacity style={globalStyles.card} onPress={() => navigation.navigate('Agenda')}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>Visão Geral</Text>
        <Text style={{marginTop: 10}}>Total de treinamentos no sistema: {treinamentos.length}</Text>
      </TouchableOpacity>

      <View style={[globalStyles.card, { marginTop: 20 }]}>
        <Text style={{fontWeight: 'bold'}}>Status do Perfil</Text>
        <Text>Seu nível de acesso: {user.role}</Text>
      </View>
    </View>
  );
}
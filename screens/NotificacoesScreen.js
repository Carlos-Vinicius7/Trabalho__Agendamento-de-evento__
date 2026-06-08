import React, { useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { TrainingContext } from '../context/TrainingContext';
import { globalStyles } from './Styles/globalStyles';

// Tela que exibe as notificações criadas pelo sistema
export default function NotificacoesScreen() {
  const { notificacoes } = useContext(TrainingContext);
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Avisos</Text>
      <FlatList 
        data={notificacoes}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={globalStyles.card}><Text>{item.mensagem}</Text></View>
        )}
      />
    </View>
  );
}
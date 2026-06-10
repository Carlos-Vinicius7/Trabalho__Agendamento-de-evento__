import React, { useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { TrainingContext } from '../context/TrainingContext';
import { globalStyles } from './Styles/globalStyles';

export default function NotificacoesScreen() {
  const { notificacoes } = useContext(TrainingContext);
  return (
    <View style={globalStyles.container}>
      <Text style={[globalStyles.title, { marginBottom: 10 }]}>Avisos</Text>
      <Text style={{ color: '#64748b', marginBottom: 20 }}>Fique por dentro das últimas atualizações</Text>
      
      <FlatList 
        data={notificacoes}
        keyExtractor={i => i.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[globalStyles.card, { flexDirection: 'row', alignItems: 'center' }]}>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#e0e7ff', justifyContent: 'center', alignItems: 'center', marginRight: 15 }}>
              <Text style={{ fontSize: 20 }}>🔔</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#1e1b4b', fontWeight: '500' }}>{item.mensagem}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
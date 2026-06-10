import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, Alert } from 'react-native';
import { TrainingContext } from '../context/TrainingContext';
import { globalStyles } from './Styles/globalStyles';

export default function AgendaScreen({ navigation }) {
  const { treinamentos, user, inscreverTreinamento } = useContext(TrainingContext);
  const [minhas, setMinhas] = useState(false); 

  const dados = minhas ? treinamentos.filter(t => t.inscritos.includes(user.id)) : treinamentos;

  return (
    <View style={globalStyles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
        <View style={{ flex: 1, minWidth: 200 }}>
          <Text style={[globalStyles.title, { marginBottom: 0 }]}>Agenda de Treinamentos</Text>
          <Text style={{ color: '#64748b' }}>{dados.length} treinamento(s) encontrado(s)</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
          <TouchableOpacity
            style={[
              globalStyles.buttonSecondary,
              { backgroundColor: minhas ? '#4f46e5' : '#e0e7ff' }
            ]}
            onPress={() => setMinhas(true)}
          >
            <Text style={[globalStyles.buttonTextSecondary, { color: minhas ? '#fff' : '#3730a3' }]}>Minhas Inscrições</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              globalStyles.buttonSecondary,
              { backgroundColor: !minhas ? '#4f46e5' : '#e0e7ff' }
            ]}
            onPress={() => setMinhas(false)}
          >
            <Text style={[globalStyles.buttonTextSecondary, { color: !minhas ? '#fff' : '#3730a3' }]}>Ver Todos</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={dados}
        keyExtractor={i => i.treinamento_id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={globalStyles.card}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#1e1b4b', marginBottom: 10 }}>
              #{index + 1} - {item.descricao}
            </Text>
            
            {item.local && (
              <View style={globalStyles.pill}>
                <Text style={globalStyles.pillText}>{item.local}</Text>
              </View>
            )}

            <View style={{ marginVertical: 10 }}>
              <Text style={{ color: '#334155', fontWeight: '500', marginBottom: 4 }}>
                Início: <Text style={{ fontWeight: 'normal' }}>{item.datahora_inicio}</Text>
              </Text>
              {item.instrutor && (
                <Text style={{ color: '#334155', fontWeight: '500', marginBottom: 4 }}>
                  Instrutor: <Text style={{ fontWeight: 'normal' }}>{item.instrutor}</Text>
                </Text>
              )}
            </View>

            <View style={globalStyles.actionRow}>
              {item.materialUrl && (
                <TouchableOpacity style={globalStyles.actionButtonLight} onPress={() => Linking.openURL(item.materialUrl)}>
                  <Text style={globalStyles.actionTextLight}>Acessar Material</Text>
                </TouchableOpacity>
              )}
              
              {item.inscritos.includes(user.id) ? (
                <View style={[globalStyles.actionButtonLight, { backgroundColor: '#dcfce7' }]}>
                  <Text style={[globalStyles.actionTextLight, { color: '#166534' }]}>✅ Inscrito</Text>
                </View>
              ) : (
                <TouchableOpacity 
                  style={[globalStyles.actionButtonLight, { backgroundColor: '#4f46e5' }]}
                  onPress={() => {
                    inscreverTreinamento(item.treinamento_id, user.id);
                    Alert.alert('Sucesso', 'Inscrição realizada!');
                  }} 
                >
                  <Text style={[globalStyles.actionTextLight, { color: '#fff' }]}>Inscrever-se</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
}
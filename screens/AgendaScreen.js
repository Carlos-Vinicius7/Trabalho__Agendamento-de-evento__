import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, Alert, TextInput } from 'react-native';
import { TrainingContext } from '../context/TrainingContext';
import { globalStyles } from './Styles/globalStyles';

export default function AgendaScreen({ navigation }) {
  const { treinamentos, user, inscreverTreinamento } = useContext(TrainingContext);
  const [minhas, setMinhas] = useState(false); 
  const [searchQuery, setSearchQuery] = useState('');

  const dados = treinamentos.filter(t => {
    // Filtro "Minhas Inscrições"
    if (minhas && !t.inscritos.includes(user.id) && !(t.lista_espera && t.lista_espera.includes(user.id))) return false;
    
    // Filtro de Texto (Busca)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchDesc = t.descricao.toLowerCase().includes(q);
      const matchInicio = t.datahora_inicio && t.datahora_inicio.toLowerCase().includes(q);
      const matchFim = t.datahora_fim && t.datahora_fim.toLowerCase().includes(q);
      if (!matchDesc && !matchInicio && !matchFim) return false;
    }
    
    return true;
  });

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

      <TextInput
        style={[globalStyles.input, { marginBottom: 20 }]}
        placeholder="🔍 Buscar por tema ou data..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

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
              ) : item.lista_espera && item.lista_espera.includes(user.id) ? (
                <View style={[globalStyles.actionButtonLight, { backgroundColor: '#fef3c7' }]}>
                  <Text style={[globalStyles.actionTextLight, { color: '#b45309' }]}>⏳ Na Lista de Espera</Text>
                </View>
              ) : (
                <TouchableOpacity 
                  style={[globalStyles.actionButtonLight, { backgroundColor: (item.capacidade > 0 && item.inscritos.length >= item.capacidade) ? '#f59e0b' : '#4f46e5' }]}
                  onPress={() => {
                    const status = inscreverTreinamento(item.treinamento_id, user.id);
                    if (status === 'INSCRITO') {
                      Alert.alert('Sucesso', 'Inscrição realizada!');
                    } else if (status === 'ESPERA') {
                      Alert.alert('Aviso', 'As vagas esgotaram, mas você foi adicionado à Lista de Espera!');
                    } else if (status === 'JA_INSCRITO') {
                      Alert.alert('Atenção', 'Você já está inscrito neste treinamento.');
                    } else if (status === 'JA_ESPERA') {
                      Alert.alert('Atenção', 'Você já está na lista de espera.');
                    }
                  }} 
                >
                  <Text style={[globalStyles.actionTextLight, { color: '#fff' }]}>
                    {(item.capacidade > 0 && item.inscritos.length >= item.capacidade) ? 'Entrar na Espera' : 'Inscrever-se'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
}
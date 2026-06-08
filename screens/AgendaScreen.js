import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, Button, Alert } from 'react-native';
import { TrainingContext } from '../context/TrainingContext';
import { globalStyles } from './Styles/globalStyles';

// Tela que mostra a lista de treinamentos e permite inscrição
export default function AgendaScreen({ navigation }) {
  const { treinamentos, user, inscreverTreinamento } = useContext(TrainingContext);
  const [minhas, setMinhas] = useState(false); // controla se mostra apenas as inscrições do usuário

  // Se ativado, exibe apenas os treinamentos em que o usuário já está inscrito
  const dados = minhas ? treinamentos.filter(t => t.inscritos.includes(user.id)) : treinamentos;

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Agenda de Treinamentos</Text>
      <View style={{ marginBottom: 15 }}>
        <Button color="#7c3aed" title={minhas ? "Ver Todos" : "Ver Minhas Inscrições"} onPress={() => setMinhas(!minhas)} />
      </View>
      <FlatList
        data={dados}
        keyExtractor={i => i.treinamento_id}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <Text style={{ fontWeight: 'bold' }}>{item.descricao}</Text>
            <Text>Início: {item.datahora_inicio}</Text>
            {item.local && <Text>Local: {item.local}</Text>}
            {item.materialUrl && (
              <TouchableOpacity onPress={() => Linking.openURL(item.materialUrl)}>
                <Text style={{ color: '#7c3aed', marginVertical: 5 }}>📂 Acessar Material</Text>
              </TouchableOpacity>
            )}
            
            {item.inscritos.includes(user.id) ? (
              <Text style={{ color: 'green', fontWeight: 'bold', marginTop: 5 }}>✅ Inscrito</Text>
            ) : (
              <View style={{ marginTop: 5 }}>
                <Button 
                  color="#7c3aed"
                  title="Inscrever-se" 
                  onPress={() => {
                    // Registra inscrição do usuário no treinamento
                    inscreverTreinamento(item.treinamento_id, user.id);
                    Alert.alert('Sucesso', 'Inscrição realizada!');
                  }} 
                />
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}
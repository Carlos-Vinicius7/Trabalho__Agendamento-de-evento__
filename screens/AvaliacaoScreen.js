import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { TrainingContext } from '../context/TrainingContext';
import { globalStyles } from './Styles/globalStyles';

export default function AvaliacaoScreen({ route, navigation }) {
  const { treinamento_id } = route.params;
  const { setAvaliacoes, user } = useContext(TrainingContext);
  const [nota, setNota] = useState('');
  const [comentario, setComentario] = useState('');

  const enviar = () => {
    setAvaliacoes(prev => [...prev, { treinamentoId: treinamento_id, userId: user.id, nota: parseInt(nota), comentario }]);
    navigation.goBack();
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Avaliar Treinamento</Text>
      
      <View style={globalStyles.card}>
        <Text style={globalStyles.label}>Nota (1 a 5)</Text>
        <TextInput 
          style={globalStyles.input} 
          placeholder="Sua nota" 
          keyboardType="numeric" 
          onChangeText={setNota} 
        />
        
        <Text style={globalStyles.label}>Comentário</Text>
        <TextInput 
          style={[globalStyles.input, { height: 100, textAlignVertical: 'top' }]} 
          placeholder="Deixe seu comentário sobre o treinamento..." 
          onChangeText={setComentario} 
          multiline
        />

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, gap: 15 }}>
          <TouchableOpacity style={globalStyles.buttonSecondary} onPress={() => navigation.goBack()}>
            <Text style={globalStyles.buttonTextSecondary}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={globalStyles.buttonPrimary} onPress={enviar}>
            <Text style={globalStyles.buttonText}>Enviar Avaliação</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
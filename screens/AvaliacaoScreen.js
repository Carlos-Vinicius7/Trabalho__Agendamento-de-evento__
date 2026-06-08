import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { TrainingContext } from '../context/TrainingContext';
import { globalStyles } from './Styles/globalStyles';

// Tela para enviar avaliação de um treinamento específico
export default function AvaliacaoScreen({ route, navigation }) {
  const { treinamento_id } = route.params;
  const { setAvaliacoes, user } = useContext(TrainingContext);
  const [nota, setNota] = useState('');
  const [comentario, setComentario] = useState('');

  const enviar = () => {
    // Registra a avaliação do usuário para este treinamento
    setAvaliacoes(prev => [...prev, { treinamentoId: treinamento_id, userId: user.id, nota: parseInt(nota), comentario }]);
    navigation.goBack();
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Avaliar Treinamento</Text>
      <TextInput style={globalStyles.input} placeholder="Nota (1-5)" keyboardType="numeric" onChangeText={setNota} />
      <TextInput style={globalStyles.input} placeholder="Comentário" onChangeText={setComentario} />
      <TouchableOpacity style={globalStyles.button} onPress={enviar}>
        <Text style={globalStyles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}
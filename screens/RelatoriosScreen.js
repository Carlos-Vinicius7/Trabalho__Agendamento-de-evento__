import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { TrainingContext } from '../context/TrainingContext';
import { globalStyles } from './Styles/globalStyles';

// Tela de relatórios e indicadores do sistema
export default function RelatoriosScreen() {
  const { treinamentos, avaliacoes, inscricoes } = useContext(TrainingContext);
  
  // cálculo básico dos indicadores de desempenho
  const totalTreinamentos = treinamentos.length;
  const mediaNotas = avaliacoes.length > 0 
    ? (avaliacoes.reduce((acc, a) => acc + a.nota, 0) / avaliacoes.length).toFixed(1) 
    : 0;

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Painel de Indicadores</Text>
      
      <View style={globalStyles.card}>
        <Text>Total de Treinamentos Cadastrados</Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{totalTreinamentos}</Text>
      </View>

      <View style={globalStyles.card}>
        <Text>Média de Satisfação</Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>⭐ {mediaNotas}</Text>
      </View>

      <View style={globalStyles.card}>
        <Text>Total de Avaliações Recebidas</Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{avaliacoes.length}</Text>
      </View>
    </View>
  );
}
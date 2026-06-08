import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, FlatList, Alert, Button } from 'react-native';
import { globalStyles } from './Styles/globalStyles';
import { TrainingContext } from '../context/TrainingContext';
import SimpleCalendar from '../components/SimpleCalendar';
import CustomPicker from '../components/CustomPicker';



// Tela de cadastro de novo treinamento no sistema
export default function CadastroScreen({ navigation }) {
  const { addTraining, mockTiposTreinamento, instrutores } = useContext(TrainingContext);
  
  // Estados mapeados ao DER
  const [descricao, setDescricao] = useState('');
  const [datahora_inicio, setDataInicio] = useState('');
  const [datahora_fim, setDataFim] = useState('');
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [capacidade, setCapacidade] = useState('');
  const [observacao, setObservacao] = useState('');
  const [tipo_id, setTipoId] = useState('');
  const [instrutor_id, setInstrutorId] = useState('');
  const [local, setLocal] = useState('');

  const handleSave = () => {
    // Valida campos obrigatórios antes de salvar
    if (!descricao.trim() || !datahora_inicio || !datahora_fim || !capacidade.trim() || !local.trim() || !tipo_id || !instrutor_id) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios (Descrição, Período, Capacidade, Local, Tipo e Instrutor).');
      return;
    }

    // Envia dados para o contexto e volta para a tela anterior
    addTraining({ descricao, datahora_inicio, datahora_fim, capacidade, observacao, tipo_id, instrutor_id, local });
    navigation.goBack();
  };



  return (
    <ScrollView style={globalStyles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <Text style={globalStyles.title}>Cadastrar Treinamento</Text>
      
      <TextInput style={globalStyles.input} placeholder="Descrição (Tema)" value={descricao} onChangeText={setDescricao} />
      
      <TouchableOpacity 
        style={[globalStyles.input, { justifyContent: 'center', backgroundColor: '#fff' }]} 
        onPress={() => setCalendarVisible(true)}
      >
        <Text style={{ color: datahora_inicio ? '#000' : '#a1a1aa' }}>
          {datahora_inicio ? `Período: ${datahora_inicio} até ${datahora_fim}` : "🗓️ Selecionar Período do Evento"}
        </Text>
      </TouchableOpacity>

      <TextInput style={globalStyles.input} placeholder="Capacidade de Vagas" keyboardType="numeric" value={capacidade} onChangeText={setCapacidade} />
      <TextInput style={globalStyles.input} placeholder="Local / Plataforma" value={local} onChangeText={setLocal} />
      <TextInput style={globalStyles.input} placeholder="Observação" value={observacao} onChangeText={setObservacao} />
      
      <Text style={{ marginTop: 10, marginBottom: 5 }}>Tipo de Treinamento:</Text>
      <CustomPicker 
        items={mockTiposTreinamento} 
        selectedValue={tipo_id} 
        onValueChange={setTipoId} 
        placeholder="Selecione um tipo" 
      />



      <Text style={{ marginTop: 20, marginBottom: 5 }}>Instrutor (para o treinamento):</Text>
      <CustomPicker 
        items={instrutores} 
        selectedValue={instrutor_id} 
        onValueChange={setInstrutorId} 
        placeholder="Selecione um instrutor" 
      />

      <TouchableOpacity style={globalStyles.button} onPress={handleSave}>
        <Text style={globalStyles.buttonText}>Salvar Planejamento</Text>
      </TouchableOpacity>



      <SimpleCalendar 
        visible={calendarVisible} 
        onClose={() => setCalendarVisible(false)} 
        onConfirm={(inicio, fim) => {
          setDataInicio(inicio);
          setDataFim(fim);
        }} 
      />
    </ScrollView>
  );
}
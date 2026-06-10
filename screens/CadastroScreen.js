import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { globalStyles } from './Styles/globalStyles';
import { TrainingContext } from '../context/TrainingContext';
import SimpleCalendar from '../components/SimpleCalendar';
import CustomPicker from '../components/CustomPicker';

export default function CadastroScreen({ navigation }) {
  const { addTraining, mockTiposTreinamento, instrutores } = useContext(TrainingContext);
  
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
    if (!descricao.trim() || !datahora_inicio || !datahora_fim || !capacidade.trim() || !local.trim() || !tipo_id || !instrutor_id) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios (Descrição, Período, Capacidade, Local, Tipo e Instrutor).');
      return;
    }

    addTraining({ descricao, datahora_inicio, datahora_fim, capacidade, observacao, tipo_id, instrutor_id, local });
    navigation.goBack();
  };

  return (
    <ScrollView style={globalStyles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <Text style={globalStyles.title}>Novo Agendamento</Text>
      
      <Text style={globalStyles.label}>Descrição do Treinamento</Text>
      <TextInput style={globalStyles.input} placeholder="Ex: Integração Novos Desenvolvedores" value={descricao} onChangeText={setDescricao} />
      
      <Text style={globalStyles.label}>Período</Text>
      <TouchableOpacity 
        style={[globalStyles.input, { justifyContent: 'center' }]} 
        onPress={() => setCalendarVisible(true)}
      >
        <Text style={{ color: datahora_inicio ? '#1e293b' : '#94a3b8' }}>
          {datahora_inicio ? `${datahora_inicio} até ${datahora_fim}` : "🗓️ Selecionar Datas"}
        </Text>
      </TouchableOpacity>

      <Text style={globalStyles.label}>Capacidade de Vagas</Text>
      <TextInput style={globalStyles.input} placeholder="Ex: 50" keyboardType="numeric" value={capacidade} onChangeText={setCapacidade} />
      
      <Text style={globalStyles.label}>Local ou Plataforma</Text>
      <TextInput style={globalStyles.input} placeholder="Ex: Sala 01 ou Zoom" value={local} onChangeText={setLocal} />
      
      <Text style={globalStyles.label}>Tipo de Treinamento</Text>
      <View style={{ marginBottom: 15 }}>
        <CustomPicker 
          items={mockTiposTreinamento} 
          selectedValue={tipo_id} 
          onValueChange={setTipoId} 
          placeholder="Selecione um tipo" 
        />
      </View>

      <Text style={globalStyles.label}>Instrutor Responsável</Text>
      <View style={{ marginBottom: 15 }}>
        <CustomPicker 
          items={instrutores} 
          selectedValue={instrutor_id} 
          onValueChange={setInstrutorId} 
          placeholder="Selecione um instrutor" 
        />
      </View>

      <Text style={globalStyles.label}>Observações Adicionais</Text>
      <TextInput 
        style={[globalStyles.input, { height: 100, textAlignVertical: 'top' }]} 
        placeholder="Informações adicionais..." 
        value={observacao} 
        onChangeText={setObservacao} 
        multiline
      />
      
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, gap: 15 }}>
        <TouchableOpacity style={[globalStyles.buttonSecondary, { paddingHorizontal: 30 }]} onPress={() => navigation.goBack()}>
          <Text style={globalStyles.buttonTextSecondary}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[globalStyles.buttonPrimary, { paddingHorizontal: 40 }]} onPress={handleSave}>
          <Text style={globalStyles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>

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
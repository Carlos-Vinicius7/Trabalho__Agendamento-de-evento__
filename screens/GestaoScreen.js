import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Button, Alert, Modal, TextInput } from 'react-native';
import { TrainingContext } from '../context/TrainingContext';
import { globalStyles } from './Styles/globalStyles';
import CustomPicker from '../components/CustomPicker';
import SimpleCalendar from '../components/SimpleCalendar';
import { TouchableOpacity, ScrollView } from 'react-native';

// Tela de gerenciamento de treinamentos, presenças e notificações
export default function GestaoScreen() {
  const { treinamentos, setPresencas, setNotificacoes, user, updateTraining, deleteTraining, mockTiposTreinamento, instrutores } = useContext(TrainingContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const registrarPresenca = (treinamentoId, userId) => {
    // Marca a presença do usuário para o treinamento selecionado
    setPresencas(prev => [...prev, { treinamentoId, userId }]);
    Alert.alert("Sucesso", "Presença confirmada!");
  };

  const handleEdit = (item) => {
    // Abre o modal de edição com os dados do evento selecionado
    setEditingEvent({ ...item });
    setModalVisible(true);
  };

  const saveEdit = () => {
    if (editingEvent) {
      updateTraining(editingEvent.treinamento_id, editingEvent);
      setModalVisible(false);
      setEditingEvent(null);
      Alert.alert("Sucesso", "Evento atualizado com sucesso!");
    }
  };

  const handleDelete = (id) => {
    Alert.alert("Confirmação", "Tem certeza que deseja excluir este evento?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", onPress: () => deleteTraining(id), style: "destructive" }
    ]);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Gestão de Presença</Text>
      <FlatList
        data={treinamentos}
        keyExtractor={i => i.treinamento_id}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 16 }}>{item.descricao}</Text>
            
            <View style={{ marginBottom: 10 }}>
              <Button color="#7c3aed" title="Marcar Presença (Logado)" onPress={() => registrarPresenca(item.treinamento_id, user.id)} />
            </View>
            <View style={{ marginBottom: 10 }}>
              <Button color="#7c3aed" title="Notificar" onPress={() => setNotificacoes(prev => [...prev, { id: Date.now().toString(), mensagem: `Aviso sobre ${item.descricao}` }])} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <View style={{ flex: 1, marginRight: 5 }}>
                <Button color="#4b5563" title="Editar" onPress={() => handleEdit(item)} />
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <Button color="#ef4444" title="Excluir" onPress={() => handleDelete(item.treinamento_id)} />
              </View>
            </View>
          </View>
        )}
      />

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
          <ScrollView style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>Editar Evento</Text>
            
            <TextInput 
              style={globalStyles.input} 
              placeholder="Descrição" 
              value={editingEvent?.descricao} 
              onChangeText={(text) => setEditingEvent({ ...editingEvent, descricao: text })} 
            />

            <TouchableOpacity 
              style={[globalStyles.input, { justifyContent: 'center', backgroundColor: '#fff' }]} 
              onPress={() => setCalendarVisible(true)}
            >
              <Text style={{ color: editingEvent?.datahora_inicio ? '#000' : '#a1a1aa' }}>
                {editingEvent?.datahora_inicio ? `Período: ${editingEvent.datahora_inicio} até ${editingEvent.datahora_fim}` : "🗓️ Selecionar Período do Evento"}
              </Text>
            </TouchableOpacity>
            <TextInput 
              style={globalStyles.input} 
              placeholder="Local" 
              value={editingEvent?.local} 
              onChangeText={(text) => setEditingEvent({ ...editingEvent, local: text })} 
            />
            <TextInput 
              style={globalStyles.input} 
              placeholder="Capacidade" 
              keyboardType="numeric"
              value={editingEvent?.capacidade ? editingEvent.capacidade.toString() : ''} 
              onChangeText={(text) => setEditingEvent({ ...editingEvent, capacidade: text })} 
            />
            <TextInput 
              style={globalStyles.input} 
              placeholder="Observação" 
              value={editingEvent?.observacao} 
              onChangeText={(text) => setEditingEvent({ ...editingEvent, observacao: text })} 
            />

            <Text style={{ marginTop: 10, marginBottom: 5 }}>Tipo de Treinamento:</Text>
            <CustomPicker 
              items={mockTiposTreinamento} 
              selectedValue={editingEvent?.treinamento_tipo_id} 
              onValueChange={(id) => setEditingEvent({ ...editingEvent, treinamento_tipo_id: id })} 
              placeholder="Selecione um tipo" 
            />

            <Text style={{ marginTop: 10, marginBottom: 5 }}>Instrutor:</Text>
            <CustomPicker 
              items={instrutores} 
              selectedValue={editingEvent?.instrutor_id} 
              onValueChange={(id) => setEditingEvent({ ...editingEvent, instrutor_id: id })} 
              placeholder="Selecione um instrutor" 
            />

            <View style={{ marginTop: 10 }}>
              <Button color="#7c3aed" title="Salvar Alterações" onPress={saveEdit} />
            </View>
            <View style={{ marginTop: 10 }}>
              <Button color="#ef4444" title="Cancelar" onPress={() => setModalVisible(false)} />
            </View>
          </ScrollView>
        </View>
      </Modal>

      <SimpleCalendar 
        visible={calendarVisible} 
        onClose={() => setCalendarVisible(false)} 
        onConfirm={(inicio, fim) => {
          if (editingEvent) {
            setEditingEvent({ ...editingEvent, datahora_inicio: inicio, datahora_fim: fim });
          }
        }} 
      />
    </View>
  );
}
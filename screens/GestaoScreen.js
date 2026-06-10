import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Alert, Modal, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { TrainingContext } from '../context/TrainingContext';
import { globalStyles } from './Styles/globalStyles';
import CustomPicker from '../components/CustomPicker';
import SimpleCalendar from '../components/SimpleCalendar';

export default function GestaoScreen() {
  const { treinamentos, setPresencas, setNotificacoes, user, updateTraining, deleteTraining, mockTiposTreinamento, instrutores } = useContext(TrainingContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const registrarPresenca = (treinamentoId, userId) => {
    setPresencas(prev => [...prev, { treinamentoId, userId }]);
    Alert.alert("Sucesso", "Presença confirmada!");
  };

  const handleEdit = (item) => {
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
      <Text style={[globalStyles.title, { marginBottom: 10 }]}>Gestão de Presença</Text>
      <Text style={{ color: '#64748b', marginBottom: 20 }}>Gerencie as presenças e envie notificações</Text>
      
      <FlatList
        data={treinamentos}
        keyExtractor={i => i.treinamento_id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#1e1b4b', marginBottom: 10 }}>{item.descricao}</Text>
            
            <View style={{ marginBottom: 15, flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              <TouchableOpacity style={globalStyles.buttonSecondary} onPress={() => registrarPresenca(item.treinamento_id, user.id)}>
                <Text style={globalStyles.buttonTextSecondary}>Marcar Presença</Text>
              </TouchableOpacity>
              <TouchableOpacity style={globalStyles.buttonSecondary} onPress={() => setNotificacoes(prev => [...prev, { id: Date.now().toString(), mensagem: `Aviso sobre ${item.descricao}` }])}>
                <Text style={globalStyles.buttonTextSecondary}>Notificar</Text>
              </TouchableOpacity>
            </View>

            <View style={{ height: 1, backgroundColor: '#e2e8f0', marginBottom: 15 }} />

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity style={[globalStyles.actionButtonLight, { flex: 1, alignItems: 'center' }]} onPress={() => handleEdit(item)}>
                <Text style={globalStyles.actionTextLight}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[globalStyles.actionButtonDanger, { flex: 1, alignItems: 'center' }]} onPress={() => handleDelete(item.treinamento_id)}>
                <Text style={globalStyles.actionTextDanger}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
          <ScrollView style={{ backgroundColor: '#fff', padding: 25, borderRadius: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#1e1b4b' }}>Editar Evento</Text>
            
            <Text style={globalStyles.label}>Descrição</Text>
            <TextInput 
              style={globalStyles.input} 
              value={editingEvent?.descricao} 
              onChangeText={(text) => setEditingEvent({ ...editingEvent, descricao: text })} 
            />

            <Text style={globalStyles.label}>Período</Text>
            <TouchableOpacity 
              style={[globalStyles.input, { justifyContent: 'center' }]} 
              onPress={() => setCalendarVisible(true)}
            >
              <Text style={{ color: '#1e293b' }}>
                {editingEvent?.datahora_inicio ? `${editingEvent.datahora_inicio} até ${editingEvent.datahora_fim}` : "🗓️ Selecionar Datas"}
              </Text>
            </TouchableOpacity>

            <Text style={globalStyles.label}>Local</Text>
            <TextInput 
              style={globalStyles.input} 
              value={editingEvent?.local} 
              onChangeText={(text) => setEditingEvent({ ...editingEvent, local: text })} 
            />

            <Text style={globalStyles.label}>Capacidade</Text>
            <TextInput 
              style={globalStyles.input} 
              keyboardType="numeric"
              value={editingEvent?.capacidade ? editingEvent.capacidade.toString() : ''} 
              onChangeText={(text) => setEditingEvent({ ...editingEvent, capacidade: text })} 
            />

            <Text style={globalStyles.label}>Observação</Text>
            <TextInput 
              style={globalStyles.input} 
              value={editingEvent?.observacao} 
              onChangeText={(text) => setEditingEvent({ ...editingEvent, observacao: text })} 
            />

            <Text style={globalStyles.label}>Tipo de Treinamento</Text>
            <View style={{ marginBottom: 15 }}>
              <CustomPicker 
                items={mockTiposTreinamento} 
                selectedValue={editingEvent?.treinamento_tipo_id} 
                onValueChange={(id) => setEditingEvent({ ...editingEvent, treinamento_tipo_id: id })} 
                placeholder="Selecione um tipo" 
              />
            </View>

            <Text style={globalStyles.label}>Instrutor</Text>
            <View style={{ marginBottom: 15 }}>
              <CustomPicker 
                items={instrutores} 
                selectedValue={editingEvent?.instrutor_id} 
                onValueChange={(id) => setEditingEvent({ ...editingEvent, instrutor_id: id })} 
                placeholder="Selecione um instrutor" 
              />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, gap: 15, marginBottom: 20 }}>
              <TouchableOpacity style={globalStyles.buttonSecondary} onPress={() => setModalVisible(false)}>
                <Text style={globalStyles.buttonTextSecondary}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={globalStyles.buttonPrimary} onPress={saveEdit}>
                <Text style={globalStyles.buttonText}>Salvar Alterações</Text>
              </TouchableOpacity>
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
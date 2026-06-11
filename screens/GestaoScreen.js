import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Alert, Modal, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { TrainingContext } from '../context/TrainingContext';
import { globalStyles } from './Styles/globalStyles';
import CustomPicker from '../components/CustomPicker';
import SimpleCalendar from '../components/SimpleCalendar';

export default function GestaoScreen() {
  const { treinamentos, setPresencas, setNotificacoes, user, updateTraining, deleteTraining, mockTiposTreinamento, instrutores, aprovarTraining, usuarios, convidarParticipante } = useContext(TrainingContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [selectedEventToInvite, setSelectedEventToInvite] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState('');
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

  const handleConvidar = () => {
    if (!selectedUserId) {
      Alert.alert("Erro", "Selecione um usuário para convidar.");
      return;
    }
    const status = convidarParticipante(selectedEventToInvite.treinamento_id, selectedUserId);
    setInviteModalVisible(false);
    setSelectedUserId('');
    setSelectedEventToInvite(null);

    if (status === 'INSCRITO') {
      Alert.alert('Sucesso', 'Usuário inscrito com sucesso e notificado!');
    } else if (status === 'ESPERA') {
      Alert.alert('Aviso', 'Treinamento lotado. Usuário foi para a Lista de Espera e notificado!');
    } else {
      Alert.alert('Atenção', 'O usuário já estava inscrito ou na lista de espera.');
    }
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
              {['Instrutor', 'Organizador', 'Gestor', 'Administrador'].includes(user.role) && (
                <TouchableOpacity style={globalStyles.buttonSecondary} onPress={() => registrarPresenca(item.treinamento_id, user.id)}>
                  <Text style={globalStyles.buttonTextSecondary}>Marcar Presença</Text>
                </TouchableOpacity>
              )}
              {['Organizador', 'Gestor', 'Administrador'].includes(user.role) && (
                <TouchableOpacity style={globalStyles.buttonSecondary} onPress={() => setNotificacoes(prev => [...prev, { id: Date.now().toString(), mensagem: `Aviso sobre ${item.descricao}` }])}>
                  <Text style={globalStyles.buttonTextSecondary}>Notificar</Text>
                </TouchableOpacity>
              )}
              {['Organizador', 'Gestor', 'Administrador'].includes(user.role) && (
                <TouchableOpacity style={globalStyles.buttonSecondary} onPress={() => { setSelectedEventToInvite(item); setInviteModalVisible(true); }}>
                  <Text style={globalStyles.buttonTextSecondary}>Convidar</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={{ height: 1, backgroundColor: '#e2e8f0', marginBottom: 15 }} />

            {['Organizador', 'Administrador'].includes(user.role) && (
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity style={[globalStyles.actionButtonLight, { flex: 1, alignItems: 'center' }]} onPress={() => handleEdit(item)}>
                  <Text style={globalStyles.actionTextLight}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[globalStyles.actionButtonDanger, { flex: 1, alignItems: 'center' }]} onPress={() => handleDelete(item.treinamento_id)}>
                  <Text style={globalStyles.actionTextDanger}>Excluir</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Aprovação de treinamento */}
            {['Gestor', 'Administrador'].includes(user.role) && (
              <View style={{ marginTop: 12 }}>
                {item.aprovado ? (
                  <View style={[globalStyles.pill, { backgroundColor: '#ecfccb' }]}>
                    <Text style={[globalStyles.pillText, { color: '#365314' }]}>Aprovado</Text>
                  </View>
                ) : (
                  <TouchableOpacity style={[globalStyles.buttonPrimary, { alignSelf: 'flex-start', marginTop: 6 }]} onPress={() => aprovarTraining(item.treinamento_id, true)}>
                    <Text style={globalStyles.buttonText}>Aprovar Treinamento</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
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

      <Modal visible={inviteModalVisible} transparent={true} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: '#fff', padding: 25, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#1e1b4b' }}>
              Convidar Participante
            </Text>
            <Text style={{ color: '#64748b', marginBottom: 20 }}>
              Selecione um usuário para convidar para {selectedEventToInvite?.descricao}
            </Text>

            <Text style={globalStyles.label}>Usuário</Text>
            <View style={{ marginBottom: 20 }}>
              <CustomPicker 
                items={usuarios.map(u => ({ ...u, nome: `${u.nome} (${u.role})` }))} 
                selectedValue={selectedUserId} 
                onValueChange={setSelectedUserId} 
                placeholder="Selecione um usuário..." 
              />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 15 }}>
              <TouchableOpacity style={globalStyles.buttonSecondary} onPress={() => setInviteModalVisible(false)}>
                <Text style={globalStyles.buttonTextSecondary}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={globalStyles.buttonPrimary} onPress={handleConvidar}>
                <Text style={globalStyles.buttonText}>Enviar Convite</Text>
              </TouchableOpacity>
            </View>
          </View>
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
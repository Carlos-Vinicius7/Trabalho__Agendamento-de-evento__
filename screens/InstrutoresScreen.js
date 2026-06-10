import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, FlatList } from 'react-native';
import { globalStyles } from './Styles/globalStyles';
import { TrainingContext } from '../context/TrainingContext';

export default function InstrutoresScreen() {
  const { instrutores, addInstrutor, updateInstrutor, deleteInstrutor } = useContext(TrainingContext);
  
  const [novoInstrutor, setNovoInstrutor] = useState('');
  const [novoEmail, setNovoEmail] = useState('');
  const [novaEspecialidade, setNovaEspecialidade] = useState('');
  const [editingInstrutor, setEditingInstrutor] = useState(null);

  const handleAddInstrutor = () => {
    if (!novoInstrutor.trim() || !novoEmail.trim() || !novaEspecialidade.trim()) {
      Alert.alert('Erro', 'Informe todos os dados do instrutor (Nome, Email, Especialidade).');
      return;
    }
    addInstrutor(novoInstrutor, novoEmail, novaEspecialidade);
    setNovoInstrutor('');
    setNovoEmail('');
    setNovaEspecialidade('');
    Alert.alert('Sucesso', 'Instrutor cadastrado!');
  };

  const handleEditInstrutor = (instrutor) => {
    setEditingInstrutor({ ...instrutor });
  };

  const handleSaveInstrutorEdit = () => {
    if (editingInstrutor && editingInstrutor.nome.trim() && editingInstrutor.email?.trim() && editingInstrutor.especialidade?.trim()) {
      updateInstrutor(editingInstrutor.id, editingInstrutor.nome, editingInstrutor.email, editingInstrutor.especialidade);
      setEditingInstrutor(null);
      Alert.alert('Sucesso', 'Instrutor atualizado!');
    } else {
      Alert.alert('Erro', 'Preencha todos os campos do instrutor.');
    }
  };

  const handleDeleteInstrutor = (id) => {
    Alert.alert("Confirmação", "Deseja excluir este instrutor?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", onPress: () => deleteInstrutor(id), style: "destructive" }
    ]);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Gerenciar Instrutores</Text>
      
      <View style={globalStyles.card}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#1e1b4b', marginBottom: 15 }}>Cadastrar Novo Instrutor</Text>
        
        <Text style={globalStyles.label}>Nome</Text>
        <TextInput 
          style={globalStyles.input} 
          placeholder="Ex: Carlos Silva" 
          value={novoInstrutor} 
          onChangeText={setNovoInstrutor} 
        />

        <Text style={globalStyles.label}>E-mail</Text>
        <TextInput 
          style={globalStyles.input} 
          placeholder="Ex: carlos@email.com" 
          value={novoEmail} 
          onChangeText={setNovoEmail} 
          keyboardType="email-address"
        />

        <Text style={globalStyles.label}>Especialidade</Text>
        <TextInput 
          style={globalStyles.input} 
          placeholder="Ex: Liderança, TI" 
          value={novaEspecialidade} 
          onChangeText={setNovaEspecialidade} 
        />

        <TouchableOpacity style={globalStyles.buttonPrimary} onPress={handleAddInstrutor}>
          <Text style={globalStyles.buttonText}>Salvar Instrutor</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ fontWeight: 'bold', color: '#1e1b4b', marginTop: 10, marginBottom: 10, fontSize: 16 }}>Lista de Instrutores</Text>
      <FlatList
        data={instrutores}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#1e1b4b' }}>{item.nome}</Text>
              <Text style={{ fontSize: 14, color: '#64748b', marginTop: 2 }}>{item.email} • {item.especialidade}</Text>
            </View>
            
            <View style={{ height: 1, backgroundColor: '#e2e8f0', marginBottom: 10 }} />

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity style={[globalStyles.actionButtonLight, { flex: 1, alignItems: 'center' }]} onPress={() => handleEditInstrutor(item)}>
                <Text style={globalStyles.actionTextLight}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[globalStyles.actionButtonDanger, { flex: 1, alignItems: 'center' }]} onPress={() => handleDeleteInstrutor(item.id)}>
                <Text style={globalStyles.actionTextDanger}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal visible={!!editingInstrutor} transparent={true} animationType="fade">
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
          <View style={{ backgroundColor: '#fff', padding: 25, borderRadius: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1e1b4b', marginBottom: 20 }}>Editar Instrutor</Text>
            
            <Text style={globalStyles.label}>Nome</Text>
            <TextInput 
              style={globalStyles.input} 
              value={editingInstrutor?.nome} 
              onChangeText={(text) => setEditingInstrutor({ ...editingInstrutor, nome: text })} 
            />

            <Text style={globalStyles.label}>E-mail</Text>
            <TextInput 
              style={globalStyles.input} 
              value={editingInstrutor?.email} 
              onChangeText={(text) => setEditingInstrutor({ ...editingInstrutor, email: text })} 
              keyboardType="email-address"
            />

            <Text style={globalStyles.label}>Especialidade</Text>
            <TextInput 
              style={globalStyles.input} 
              value={editingInstrutor?.especialidade} 
              onChangeText={(text) => setEditingInstrutor({ ...editingInstrutor, especialidade: text })} 
            />

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, gap: 15 }}>
              <TouchableOpacity style={globalStyles.buttonSecondary} onPress={() => setEditingInstrutor(null)}>
                <Text style={globalStyles.buttonTextSecondary}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={globalStyles.buttonPrimary} onPress={handleSaveInstrutorEdit}>
                <Text style={globalStyles.buttonText}>Salvar Alterações</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

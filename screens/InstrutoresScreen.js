import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Button, Alert, FlatList } from 'react-native';
import { globalStyles } from './Styles/globalStyles';
import { TrainingContext } from '../context/TrainingContext';

// Tela para cadastrar, editar e excluir instrutores
export default function InstrutoresScreen() {
  const { instrutores, addInstrutor, updateInstrutor, deleteInstrutor } = useContext(TrainingContext);
  
  const [novoInstrutor, setNovoInstrutor] = useState('');
  const [novoEmail, setNovoEmail] = useState('');
  const [novaEspecialidade, setNovaEspecialidade] = useState('');
  const [editingInstrutor, setEditingInstrutor] = useState(null);

  const handleAddInstrutor = () => {
    // Valida as informações antes de cadastrar um novo instrutor
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
    // Salva alterações em um instrutor existente
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
      
      <View style={{ marginTop: 20, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, backgroundColor: '#f9f9f9' }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Cadastrar Novo Instrutor</Text>
        <TextInput 
          style={globalStyles.input} 
          placeholder="Nome do Instrutor" 
          value={novoInstrutor} 
          onChangeText={setNovoInstrutor} 
        />
        <TextInput 
          style={globalStyles.input} 
          placeholder="E-mail" 
          value={novoEmail} 
          onChangeText={setNovoEmail} 
          keyboardType="email-address"
        />
        <TextInput 
          style={globalStyles.input} 
          placeholder="Especialidade (ex: Liderança, TI)" 
          value={novaEspecialidade} 
          onChangeText={setNovaEspecialidade} 
        />
        <TouchableOpacity style={[globalStyles.button, { backgroundColor: '#4b5563', marginTop: 5 }]} onPress={handleAddInstrutor}>
          <Text style={globalStyles.buttonText}>Salvar Instrutor</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ fontWeight: 'bold', marginTop: 20, marginBottom: 10 }}>Lista de Instrutores</Text>
      <FlatList
        data={instrutores}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderColor: '#eee' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.nome}</Text>
              <Text style={{ fontSize: 12, color: '#666' }}>{item.email} • {item.especialidade}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => handleEditInstrutor(item)} style={{ marginRight: 15 }}>
                <Text style={{ color: '#4b5563', fontWeight: 'bold' }}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteInstrutor(item.id)}>
                <Text style={{ color: 'red', fontWeight: 'bold' }}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal visible={!!editingInstrutor} transparent={true} animationType="fade">
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>Editar Instrutor</Text>
            
            <TextInput 
              style={globalStyles.input} 
              placeholder="Nome do Instrutor" 
              value={editingInstrutor?.nome} 
              onChangeText={(text) => setEditingInstrutor({ ...editingInstrutor, nome: text })} 
            />
            <TextInput 
              style={globalStyles.input} 
              placeholder="E-mail" 
              value={editingInstrutor?.email} 
              onChangeText={(text) => setEditingInstrutor({ ...editingInstrutor, email: text })} 
              keyboardType="email-address"
            />
            <TextInput 
              style={globalStyles.input} 
              placeholder="Especialidade" 
              value={editingInstrutor?.especialidade} 
              onChangeText={(text) => setEditingInstrutor({ ...editingInstrutor, especialidade: text })} 
            />

            <View style={{ marginTop: 10 }}>
              <Button color="#7c3aed" title="Salvar Alterações" onPress={handleSaveInstrutorEdit} />
            </View>
            <View style={{ marginTop: 10 }}>
              <Button color="#ef4444" title="Cancelar" onPress={() => setEditingInstrutor(null)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

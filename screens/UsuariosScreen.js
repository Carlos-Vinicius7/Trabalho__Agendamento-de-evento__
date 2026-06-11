import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Alert, Modal, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { TrainingContext } from '../context/TrainingContext';
import { globalStyles } from './Styles/globalStyles';
import CustomPicker from '../components/CustomPicker';

export default function UsuariosScreen() {
  const { usuarios, updateUsuario, deleteUsuario } = useContext(TrainingContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const rolesPossiveis = [
    { id: 'Administrador', nome: 'Administrador' },
    { id: 'Organizador', nome: 'Organizador' },
    { id: 'Gestor', nome: 'Gestor' },
    { id: 'Instrutor', nome: 'Instrutor' },
    { id: 'Participante', nome: 'Participante' }
  ];

  const handleEdit = (user) => {
    setEditingUser({ ...user });
    setModalVisible(true);
  };

  const saveEdit = () => {
    if (editingUser) {
      if (!editingUser.nome.trim() || !editingUser.senha.trim()) {
        Alert.alert('Erro', 'Nome e Senha são obrigatórios.');
        return;
      }
      updateUsuario(editingUser.id, editingUser.nome, editingUser.senha, editingUser.role);
      setModalVisible(false);
      setEditingUser(null);
      Alert.alert('Sucesso', 'Usuário atualizado com sucesso!');
    }
  };

  const handleDelete = (id) => {
    Alert.alert("Confirmação", "Tem certeza que deseja excluir este usuário?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", onPress: () => deleteUsuario(id), style: "destructive" }
    ]);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={[globalStyles.title, { marginBottom: 10 }]}>Gestão de Usuários</Text>
      <Text style={{ color: '#64748b', marginBottom: 20 }}>Edite ou remova perfis de acesso</Text>
      
      <FlatList
        data={usuarios}
        keyExtractor={i => i.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#1e1b4b', marginBottom: 5 }}>{item.nome}</Text>
            <Text style={{ color: '#334155', marginBottom: 2 }}>Cargo: <Text style={{ fontWeight: 'bold' }}>{item.role}</Text></Text>
            <Text style={{ color: '#334155', marginBottom: 15 }}>Senha: ****</Text>
            
            <View style={{ height: 1, backgroundColor: '#e2e8f0', marginBottom: 15 }} />

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity style={[globalStyles.actionButtonLight, { flex: 1, alignItems: 'center' }]} onPress={() => handleEdit(item)}>
                <Text style={globalStyles.actionTextLight}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[globalStyles.actionButtonDanger, { flex: 1, alignItems: 'center' }]} onPress={() => handleDelete(item.id)}>
                <Text style={globalStyles.actionTextDanger}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
          <ScrollView style={{ backgroundColor: '#fff', padding: 25, borderRadius: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#1e1b4b' }}>Editar Usuário</Text>
            
            <Text style={globalStyles.label}>Nome</Text>
            <TextInput 
              style={globalStyles.input} 
              value={editingUser?.nome} 
              onChangeText={(text) => setEditingUser({ ...editingUser, nome: text })} 
            />

            <Text style={globalStyles.label}>Senha</Text>
            <TextInput 
              style={globalStyles.input} 
              value={editingUser?.senha} 
              secureTextEntry
              onChangeText={(text) => setEditingUser({ ...editingUser, senha: text })} 
            />

            <Text style={globalStyles.label}>Cargo / Nível de Acesso</Text>
            <View style={{ marginBottom: 15 }}>
              <CustomPicker 
                items={rolesPossiveis} 
                selectedValue={editingUser?.role} 
                onValueChange={(id) => setEditingUser({ ...editingUser, role: id })} 
                placeholder="Selecione um cargo..." 
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
    </View>
  );
}

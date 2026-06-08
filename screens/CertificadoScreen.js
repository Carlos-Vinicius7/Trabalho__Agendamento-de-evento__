import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Button, Modal, TextInput } from 'react-native';
import { TrainingContext } from '../context/TrainingContext';
import { globalStyles } from './Styles/globalStyles';

// Tela de certificados, onde o usuário pode gerar e baixar certificados de presença
export default function CertificadoScreen() {
  const { treinamentos, user, podeGerarCertificado } = useContext(TrainingContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [nomeCertificado, setNomeCertificado] = useState(user.nome);

  const handleEditCertificate = (treinamento) => {
    setSelectedTraining(treinamento);
    setNomeCertificado(user.nome);
    setModalVisible(true);
  };

  const handleDownload = () => {
    // Simula a geração do certificado e mostra alerta de download
    Alert.alert("Download", `Certificado gerado para: ${nomeCertificado}\nTreinamento: ${selectedTraining?.descricao}`);
    setModalVisible(false);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Meus Certificados</Text>
      <FlatList
        data={treinamentos}
        keyExtractor={i => i.treinamento_id}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.descricao}</Text>
            {podeGerarCertificado(item.treinamento_id, user.id) ? (
              <View style={{ marginTop: 10 }}>
                <Button color="#7c3aed" title="Editar e Baixar PDF" onPress={() => handleEditCertificate(item)} />
              </View>
            ) : (
              <Text style={{ color: 'red', marginTop: 10, fontWeight: 'bold' }}>Pendente: Confirmação de Presença</Text>
            )}
          </View>
        )}
      />

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>Editar Certificado</Text>
            <Text style={{ marginBottom: 5 }}>Nome impresso no certificado:</Text>
            <TextInput 
              style={globalStyles.input} 
              placeholder="Seu Nome Completo" 
              value={nomeCertificado} 
              onChangeText={setNomeCertificado} 
            />

            <View style={{ marginTop: 10 }}>
              <Button color="#7c3aed" title="Gerar e Baixar PDF" onPress={handleDownload} />
            </View>
            <View style={{ marginTop: 10 }}>
              <Button color="#ef4444" title="Cancelar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
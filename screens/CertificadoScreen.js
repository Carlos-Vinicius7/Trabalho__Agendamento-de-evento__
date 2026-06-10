import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { TrainingContext } from '../context/TrainingContext';
import { globalStyles } from './Styles/globalStyles';

export default function CertificadoScreen() {
  const { treinamentos, user, podeGerarCertificado } = useContext(TrainingContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [nomeCertificado, setNomeCertificado] = useState(user?.nome || '');

  const handleEditCertificate = (treinamento) => {
    setSelectedTraining(treinamento);
    setNomeCertificado(user?.nome || '');
    setModalVisible(true);
  };

  const handleDownload = () => {
    Alert.alert("Download", `Certificado gerado para: ${nomeCertificado}\nTreinamento: ${selectedTraining?.descricao}`);
    setModalVisible(false);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Meus Certificados</Text>
      <FlatList
        data={treinamentos}
        keyExtractor={i => i.treinamento_id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#1e1b4b', marginBottom: 10 }}>{item.descricao}</Text>
            
            {podeGerarCertificado(item.treinamento_id, user.id) ? (
              <TouchableOpacity style={[globalStyles.buttonSecondary, { marginTop: 5 }]} onPress={() => handleEditCertificate(item)}>
                <Text style={globalStyles.buttonTextSecondary}>Editar e Baixar PDF</Text>
              </TouchableOpacity>
            ) : (
              <View style={[globalStyles.pill, { backgroundColor: '#fee2e2', marginTop: 5 }]}>
                <Text style={[globalStyles.pillText, { color: '#991b1b' }]}>Pendente Presença</Text>
              </View>
            )}
          </View>
        )}
      />

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
          <View style={{ backgroundColor: '#fff', padding: 25, borderRadius: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1e1b4b', marginBottom: 20 }}>Editar Certificado</Text>
            
            <Text style={globalStyles.label}>Nome impresso no certificado</Text>
            <TextInput 
              style={globalStyles.input} 
              placeholder="Seu Nome Completo" 
              value={nomeCertificado} 
              onChangeText={setNomeCertificado} 
            />

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, gap: 15 }}>
              <TouchableOpacity style={globalStyles.buttonSecondary} onPress={() => setModalVisible(false)}>
                <Text style={globalStyles.buttonTextSecondary}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={globalStyles.buttonPrimary} onPress={handleDownload}>
                <Text style={globalStyles.buttonText}>Gerar PDF</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
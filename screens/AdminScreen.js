import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { TrainingContext } from '../context/TrainingContext';
import { globalStyles } from './Styles/globalStyles';

export default function AdminScreen() {
  // Nota: Para este exemplo, imagine uma lista de usuários no seu contexto
  const { usuarios, alterarRole } = useContext(TrainingContext); 

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Painel Administrativo</Text>
      <FlatList 
        data={usuarios}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <Text style={{ fontWeight: 'bold' }}>{item.nome}</Text>
            <Text>Perfil atual: {item.role}</Text>
            
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => alterarRole(item.id, 'Instrutor')}>
                <Text style={{ fontSize: 10 }}>Tornar Instrutor</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => alterarRole(item.id, 'Participante')}>
                <Text style={{ fontSize: 10 }}>Tornar Participante</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    padding: 8,
    backgroundColor: '#e2e8f0',
    marginRight: 5,
    borderRadius: 5
  }
});
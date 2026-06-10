import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from './Styles/globalStyles';
import { TrainingContext } from '../context/TrainingContext';

export default function LoginScreen({ navigation }) {
  const { setUser, addUsuario, usuarios } = useContext(TrainingContext);
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAction = () => {
    if (!nome.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Por favor, insira seu nome e senha.');
      return;
    }

    if (isRegistering) {
      const existingUser = usuarios.find(u => u.nome.toLowerCase() === nome.toLowerCase());
      if (existingUser) {
        Alert.alert('Erro', 'Nome de usuário já existe.');
        return;
      }
      const newUser = addUsuario(nome, senha, 'Organizador');
      setUser(newUser);
      navigation.replace('Main');
    } else {
      const existingUser = usuarios.find(u => u.nome.toLowerCase() === nome.toLowerCase());
      if (existingUser) {
        if (existingUser.senha === senha || existingUser.senha === undefined) { 
          setUser(existingUser);
          navigation.replace('Main');
        } else {
          Alert.alert('Erro', 'Senha incorreta.');
        }
      } else {
        Alert.alert('Erro', 'Usuário não encontrado.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.cardContainer}>
        {/* Ícone do Topo */}
        <View style={styles.iconBox}>
          <Ionicons name="school" size={40} color="#fff" />
        </View>

        <Text style={styles.headerTitle}>Gestão de Treinamentos</Text>
        <Text style={styles.headerSubtitle}>Sistema de controle corporativo</Text>

        <Text style={globalStyles.label}>Nome</Text>
        <TextInput 
          style={globalStyles.input} 
          placeholder="Digite seu nome" 
          value={nome} 
          onChangeText={setNome} 
        />

        <Text style={globalStyles.label}>Senha</Text>
        <TextInput 
          style={globalStyles.input} 
          placeholder="Digite sua senha" 
          value={senha} 
          onChangeText={setSenha}
          secureTextEntry 
        />
        
        <TouchableOpacity style={[globalStyles.buttonPrimary, { marginTop: 10 }]} onPress={handleAction}>
          <Text style={globalStyles.buttonText}>{isRegistering ? 'Cadastrar' : 'Entrar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)} style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={{ color: '#4f46e5', fontWeight: 'bold' }}>
            {isRegistering ? 'Já tenho cadastro' : 'Criar uma conta'}
          </Text>
        </TouchableOpacity>

        {!isRegistering && (
          <Text style={styles.footerInfo}>Login inicial: Carlos | Senha: 1234</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#1e1b4b', // Fundo escuro (roxo profundo)
    justifyContent: 'center',
    padding: 20,
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    paddingTop: 35,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  iconBox: {
    backgroundColor: '#4f46e5', // Roxo principal
    width: 70,
    height: 70,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e1b4b',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 30,
  },
  footerInfo: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 12,
    color: '#64748b',
  }
});
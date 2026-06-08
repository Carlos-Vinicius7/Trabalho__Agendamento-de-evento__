import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { globalStyles } from './Styles/globalStyles';
import { TrainingContext } from '../context/TrainingContext';

// Tela de login e cadastro de usuários
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
      // Cria uma nova conta caso o usuário esteja no modo de registro
      const existingUser = usuarios.find(u => u.nome.toLowerCase() === nome.toLowerCase());
      if (existingUser) {
        Alert.alert('Erro', 'Nome de usuário já existe.');
        return;
      }
      const newUser = addUsuario(nome, senha, 'Organizador');
      setUser(newUser);
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.replace('Main');
    } else {
      // Autentica usuário existente
      const existingUser = usuarios.find(u => u.nome.toLowerCase() === nome.toLowerCase());
      if (existingUser) {
        if (existingUser.senha === senha || existingUser.senha === undefined) { // allow undefined for old users without pass
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
    <View style={[globalStyles.container, { justifyContent: 'center' }]}>
      <Text style={globalStyles.title}>{isRegistering ? 'Criar Conta' : 'Login Corporativo'}</Text>
      <TextInput 
        style={globalStyles.input} 
        placeholder="Seu Nome" 
        value={nome} 
        onChangeText={setNome} 
      />
      <TextInput 
        style={globalStyles.input} 
        placeholder="Sua Senha" 
        value={senha} 
        onChangeText={setSenha}
        secureTextEntry 
      />
      
      <TouchableOpacity style={globalStyles.button} onPress={handleAction}>
        <Text style={globalStyles.buttonText}>{isRegistering ? 'Cadastrar e Entrar' : 'Entrar'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)} style={{ marginTop: 20, alignItems: 'center' }}>
        <Text style={{ color: '#7c3aed', fontWeight: 'bold' }}>
          {isRegistering ? 'Já tem uma conta? Entre aqui' : 'Não tem conta? Cadastre-se'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
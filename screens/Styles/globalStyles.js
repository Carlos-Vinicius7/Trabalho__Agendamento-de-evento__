import { StyleSheet } from 'react-native';

// Estilos globais reutilizados em várias telas e componentes
export const globalStyles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'transparent' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', padding: 15, borderRadius: 8, marginBottom: 15 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2 },
  button: { backgroundColor: '#7c3aed', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
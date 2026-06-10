import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  // Fundo principal muito claro
  container: { flex: 1, padding: 20, backgroundColor: '#f5f3ff' },
  
  // Título da página
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#1e1b4b' },
  
  // Rótulos de formulário
  label: { fontSize: 14, fontWeight: 'bold', color: '#1e3a8a', marginBottom: 5 }, // Cor da imagem (azul escuro) / ajustado para tom escuro
  
  // Campo de digitação estilo "bolha" branca
  input: { 
    backgroundColor: '#fff', 
    borderWidth: 1, 
    borderColor: '#e2e8f0', 
    padding: 15, 
    borderRadius: 15, 
    marginBottom: 15 
  },
  
  // Cartão branco com cantos bem arredondados
  card: { 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 15, 
    marginBottom: 15, 
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 0 // Sem sombra forte, visual mais flat
  },
  
  // Botão principal roxo sólido
  button: { 
    backgroundColor: '#3b82f6', // Na referência era azul #3b82f6, como pedido roxo: #4f46e5 ou #7c3aed
    padding: 15, 
    borderRadius: 12, 
    alignItems: 'center' 
  },
  buttonPrimary: {
    backgroundColor: '#4f46e5', // Roxo principal
    padding: 15, 
    borderRadius: 12, 
    alignItems: 'center'
  },
  buttonSecondary: {
    backgroundColor: '#e0e7ff', // Roxo bem claro
    padding: 15, 
    borderRadius: 12, 
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  buttonTextSecondary: { color: '#3730a3', fontWeight: 'bold' }, // Texto para botão secundário
  
  // Tag tipo "Pill"
  pill: {
    backgroundColor: '#e0e7ff', // Fundo roxinho/azulado
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 10
  },
  pillText: {
    color: '#3730a3', // Texto escuro combinando
    fontWeight: 'bold',
    fontSize: 12
  },

  // Botões de ação pequenos (Editar/Excluir)
  actionRow: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10
  },
  actionButtonLight: {
    backgroundColor: '#e0e7ff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8
  },
  actionButtonDanger: {
    backgroundColor: '#fee2e2',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8
  },
  actionTextLight: { color: '#3730a3', fontWeight: 'bold' },
  actionTextDanger: { color: '#991b1b', fontWeight: 'bold' }
});
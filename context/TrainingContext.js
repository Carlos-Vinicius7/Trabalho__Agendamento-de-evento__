import React, { createContext, useState } from 'react';

// Cria o contexto global usado para compartilhar dados entre componentes
export const TrainingContext = createContext();

export const TrainingProvider = ({ children }) => {
  const [treinamentos, setTreinamentos] = useState([]); // lista de treinamentos cadastrados
  const [user, setUser] = useState({ id: '1', nome: 'Usuário Teste', role: 'Administrador' }); // usuário logado atualmente
  const [presencas, setPresencas] = useState([]); // lista de presenças registradas
  const [avaliacoes, setAvaliacoes] = useState([]); // lista de avaliações feitas nos treinamentos
  const [notificacoes, setNotificacoes] = useState([]); // notificações do sistema

  const [usuarios, setUsuarios] = useState([
    { id: '1', nome: 'Carlos', senha: '1234', role: 'Administrador' }
  ]); // usuários que podem logar no sistema

  // Dados simulados de tipos de treinamento para uso em dropdowns
  const mockTiposTreinamento = [
    { id: '1', nome: 'Presencial' },
    { id: '2', nome: 'Ensino a Distância (EAD)' },
    { id: '3', nome: 'Híbrido' }
  ];

  const [instrutores, setInstrutores] = useState([
    { id: '10', nome: 'Carlos Silva', email: 'carlos@empresa.com', especialidade: 'Liderança' },
    { id: '11', nome: 'Ana Souza', email: 'ana@empresa.com', especialidade: 'Tecnologia' }
  ]);

  const addInstrutor = (nome, email, especialidade) => {
    const newId = Date.now().toString();
    // Adiciona um novo instrutor à lista de instrutores
    setInstrutores([...instrutores, { id: newId, nome, email, especialidade }]);
  };

  const updateInstrutor = (id, nome, email, especialidade) => {
    // Atualiza os dados de um instrutor existente
    setInstrutores(prev => prev.map(i => i.id === id ? { ...i, nome, email, especialidade } : i));
  };

  const deleteInstrutor = (id) => {
    // Remove um instrutor da lista pelo ID
    setInstrutores(prev => prev.filter(i => i.id !== id));
  };

  const addUsuario = (nome, senha, role = 'Participante') => {
    const newId = Date.now().toString();
    const newUser = { id: newId, nome, senha, role };
    // Adiciona um novo usuário ao sistema e retorna o usuário criado
    setUsuarios([...usuarios, newUser]);
    return newUser;
  };

  const addTraining = (data) => {
    // Cria um objeto de treinamento a partir dos dados do formulário
    const newTraining = { 
      treinamento_id: Date.now().toString(),
      descricao: data.descricao,
      datahora_inicio: data.datahora_inicio,
      datahora_fim: data.datahora_fim,
      treinamento_tipo_id: data.tipo_id,
      instrutor_id: data.instrutor_id,
      local: data.local,
      observacao: data.observacao,
      capacidade: parseInt(data.capacidade) || 0,
      materialUrl: data.materialUrl,
      inscritos: []
    };
    setTreinamentos([...treinamentos, newTraining]);
  };

  const updateTraining = (id, updatedData) => {
    // Atualiza os dados de um treinamento específico
    setTreinamentos(prev => prev.map(t => 
      t.treinamento_id === id ? { ...t, ...updatedData } : t
    ));
  };

  const deleteTraining = (id) => {
    // Remove um treinamento pelo ID
    setTreinamentos(prev => prev.filter(t => t.treinamento_id !== id));
  };

  const inscreverTreinamento = (treinamentoId, userId) => {
    // Adiciona o usuário à lista de inscritos do treinamento
    setTreinamentos(prev => prev.map(t => {
      if (t.treinamento_id === treinamentoId) {
        if (!t.inscritos.includes(userId)) {
          return { ...t, inscritos: [...t.inscritos, userId] };
        }
      }
      return t;
    }));
  };

  const podeGerarCertificado = (tId, uId) => {
    // Verifica se existe presença registrada para gerar o certificado
    return presencas.some(p => p.treinamentoId === tId && p.userId === uId);
  };

  return (
    // Fornece todos os estados e ações do contexto aos componentes filhos
    <TrainingContext.Provider value={{ 
      treinamentos, setTreinamentos, user, setUser, presencas, setPresencas, 
      avaliacoes, setAvaliacoes, notificacoes, setNotificacoes, 
      addTraining, updateTraining, deleteTraining, inscreverTreinamento, podeGerarCertificado,
      mockTiposTreinamento, instrutores, addInstrutor, updateInstrutor, deleteInstrutor, usuarios, addUsuario
    }}>
      {children}
    </TrainingContext.Provider>
  );
};
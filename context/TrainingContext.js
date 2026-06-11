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
      inscritos: [],
      lista_espera: [],
      aprovado: false // por padrão, novos treinamentos precisam ser aprovados
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
    let status = ''; // Retorna status: JA_INSCRITO, JA_ESPERA, INSCRITO, ESPERA
    setTreinamentos(prev => prev.map(t => {
      if (t.treinamento_id === treinamentoId) {
        if (t.inscritos.includes(userId)) {
          status = 'JA_INSCRITO';
          return t;
        }
        if (t.lista_espera && t.lista_espera.includes(userId)) {
          status = 'JA_ESPERA';
          return t;
        }

        // Verifica capacidade (se capacidade for 0, consideramos ilimitado, ou podemos forçar limite. Vamos forçar o que estiver definido no contexto)
        // Se a capacidade for maior que 0 e o número de inscritos for menor que a capacidade
        if (t.capacidade === 0 || t.inscritos.length < t.capacidade) {
          status = 'INSCRITO';
          return { ...t, inscritos: [...t.inscritos, userId] };
        } else {
          status = 'ESPERA';
          return { ...t, lista_espera: [...(t.lista_espera || []), userId] };
        }
      }
      return t;
    }));
    return status;
  };

  const convidarParticipante = (treinamentoId, userId) => {
    const status = inscreverTreinamento(treinamentoId, userId);
    const userObj = usuarios.find(u => u.id === userId);
    const nome = userObj ? userObj.nome : 'Participante';

    if (status === 'INSCRITO') {
      setNotificacoes(prev => [...prev, { id: Date.now().toString(), mensagem: `Você enviou um convite para ${nome} e ele(a) foi inscrito(a) no treinamento.` }]);
    } else if (status === 'ESPERA') {
      setNotificacoes(prev => [...prev, { id: Date.now().toString(), mensagem: `${nome} foi colocado(a) na lista de espera do treinamento.` }]);
    }
    return status;
  };

  const aprovarTraining = (treinamentoId, aprovado = true) => {
    setTreinamentos(prev => prev.map(t => t.treinamento_id === treinamentoId ? { ...t, aprovado } : t));
  };

  const alterarRole = (userId, newRole) => {
    setUsuarios(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    // Se o usuário atual teve a role alterada, atualize o contexto `user` também
    if (user && user.id === userId) {
      setUser({ ...user, role: newRole });
    }
  };

  const updateUsuario = (id, nome, senha, role) => {
    setUsuarios(prev => prev.map(u => u.id === id ? { ...u, nome, senha, role } : u));
    if (user && user.id === id) {
      setUser({ ...user, nome, role }); // Update logged in user state
    }
  };

  const deleteUsuario = (id) => {
    setUsuarios(prev => prev.filter(u => u.id !== id));
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
      addTraining, updateTraining, deleteTraining, inscreverTreinamento, convidarParticipante, podeGerarCertificado,
      mockTiposTreinamento, instrutores, addInstrutor, updateInstrutor, deleteInstrutor, usuarios, addUsuario,
      aprovarTraining, alterarRole, updateUsuario, deleteUsuario
    }}>
      {children}
    </TrainingContext.Provider>
  );
};
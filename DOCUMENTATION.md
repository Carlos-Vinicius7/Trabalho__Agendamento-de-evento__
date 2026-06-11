# Documentação do Projeto AV2

Este documento descreve o propósito de cada arquivo principal, a arquitetura do aplicativo e como rodar o projeto.

## Visão Geral

O app é um sistema de gestão de treinamentos organizado como uma aplicação React Native com Expo. Ele oferece funcionalidades para:

- consultar agenda de treinamentos (com barra de busca integrada);
- cadastrar novos cursos e instrutores;
- inscrever usuários em eventos (com controle de capacidade e lista de espera);
- registrar presença e gerar certificados;
- enviar notificações e convites para participantes;
- exibir relatórios e avaliações;
- gerenciar perfis de acesso sob uma hierarquia estrita de papéis.

A estrutura foi pensada para facilitar o uso em dispositivos móveis e para permitir diferentes perfis de usuário (participante, gestor/admin).

## Tecnologias Utilizadas

- React Native
- Expo
- React Navigation (Stack e Bottom Tabs)
- Context API para gerenciamento global de estado
- `expo-linear-gradient` para layout com gradientes
- `@expo/vector-icons` para ícones

## Estrutura de Arquivos

- `App.js`: componente raiz e configuração de navegação.
- `index.js`: ponto de entrada do Expo.
- `context/TrainingContext.js`: provedor de estado global e funções de CRUD.
- `screens/`: telas da aplicação.
- `components/`: componentes reutilizáveis.
- `screens/Styles/globalStyles.js`: estilos compartilhados.

## Contexto Global

### `context/TrainingContext.js`

Responsável por armazenar e compartilhar dados entre as telas. Contém:

- estados principais:
  - `treinamentos`
  - `user`
  - `presencas`
  - `avaliacoes`
  - `notificacoes`
  - `usuarios`
  - `instrutores`
- funções de manipulação:
  - `addInstrutor`, `updateInstrutor`, `deleteInstrutor`
  - `addUsuario`, `updateUsuario`, `deleteUsuario`, `alterarRole`
  - `addTraining`, `updateTraining`, `deleteTraining`
  - `inscreverTreinamento` (gerencia também a lista de espera)
  - `convidarParticipante` (associa usuários diretamente)
  - `aprovarTraining`
  - `podeGerarCertificado`
- dados mock de tipos de treinamento e status.

## Telas (Screens)

### `screens/LoginScreen.js`

Tela inicial de autenticação e registro. Permite:

- login de usuário existente;
- cadastro de novo usuário;
- salvamento do usuário autenticado no contexto;
- navegação para a área principal após autenticação.

### `screens/HomeScreen.js`

Dashboard principal. Exibe:

- nome do usuário logado;
- papel/role do usuário;
- resumo de treinamentos cadastrados;
- acesso rápido para telas principais.

### `screens/AgendaScreen.js`

Agenda de eventos e treinamentos. Possui:

- lista de treinamentos disponíveis;
- campo de **busca livre** (pesquisa por tema ou período);
- filtro dinâmico entre todos os treinamentos e inscrições do usuário;
- botão de inscrição (com trava automática para **Lista de Espera** caso exceda a capacidade de vagas);
- indicação de status de inscrição (✅ Inscrito / ⏳ Na Lista de Espera);
- opção de acessar material quando disponível.

### `screens/CadastroScreen.js`

Formulário de cadastro de treinamentos. Inclui:

- campos de descrição, local, observação e capacidade;
- seleção de período com `SimpleCalendar`;
- seleção de tipo e instrutor com `CustomPicker`;
- validação de campos obrigatórios.

### `screens/GestaoScreen.js`

Gestão de treinamentos e presença, moldada pelo perfil hierárquico do usuário. Permite:

- listar todos os treinamentos (visibilidade de ações depende da role);
- marcar presença do usuário no evento;
- editar ou excluir eventos (Organizadores/Admins);
- enviar notificações e disparar **convites** para usuários (selecionados em um menu contendo nome e cargo);
- aprovar treinamentos (exclusivo para Gestores/Admins);
- usar calendário para alterar datas de evento.

### `screens/InstrutoresScreen.js`

Gerenciamento completo de instrutores. Funcionalidades:

- adicionar instrutores;
- editar informações de instrutores;
- excluir instrutores;
- exibir lista de profissionais cadastrados.

### `screens/UsuariosScreen.js`

Tela administrativa para gestão de perfis e acessos. Exclusiva para **Administradores**.
Funcionalidades:
- lista de todos os usuários cadastrados no sistema;
- modal de edição para alterar Nome, Senha e modificar o **Nível/Cargo** do usuário (Administrador, Gestor, Organizador, Instrutor, Participante);
- opção de excluir o perfil do sistema.

### `screens/CertificadoScreen.js`

Geração de certificados de participação. Verifica:

- se o usuário possui presença registrada;
- se o treinamento está elegível para certificado;
- permite editar nome do certificado;
- simula o processo de geração/baixar certificado.

### `screens/AvaliacaoScreen.js`

Envio de avaliações do treinamento. Detalhes:

- recebe `treinamento_id` via parâmetros de rota;
- captura nota e comentário;
- armazena avaliação no contexto;
- retorna para a tela anterior ao finalizar.

### `screens/NotificacoesScreen.js`

Exibe as notificações do sistema. Cada notificação:

- aparece em um cartão;
- mostra texto e data de criação;
- é extraída do estado global de `notificacoes`.

### `screens/RelatoriosScreen.js`

Apresenta métricas e indicadores básicos:

- total de treinamentos cadastrados;
- média das avaliações recebidas;
- total de avaliações enviadas.

### `screens/AdminScreen.js`

Painel administrativo. Serve como área de controle geral e pode conter:

- visualização de dados administrativos;
- atalhos para funções de gestão;
- opções específicas para usuários com perfil admin.

## Componentes Reutilizáveis

### `components/Header.js`

Componente de cabeçalho reutilizável. Ele:

- renderiza título e subtítulo;
- exibe botão de logout quando recebe `onLogout`;
- usa `SafeAreaView` para compatibilidade com dispositivos móveis;
- centraliza o layout com estilo de cabeçalho escuro.

### `components/CustomPicker.js`

Picker customizado para seleção de itens. Características:

- recebe `items`, `selectedValue`, `onValueChange` e `placeholder`;
- abre modal com lista via `FlatList`;
- permite escolher um item e fechar o modal.

### `components/SimpleCalendar.js`

Componente de calendário para seleção de intervalo. Ele:

- navega entre meses e anos;
- seleciona data de início e fim;
- destaca intervalos escolhidos;
- retorna as datas selecionadas via `onConfirm`.

## Estilos

### `screens/Styles/globalStyles.js`

Define estilos globais usados pelo app. Inclui:

- contêiner principal (`container`);
- textos e títulos (`title`, `subtitle`);
- botões (`button`, `buttonText`);
- cartões de exibição (`card`).

## Dependências Principais

- `expo`
- `react`
- `react-native`
- `react-navigation/native`
- `@react-navigation/stack`
- `@react-navigation/bottom-tabs`
- `react-native-gesture-handler`
- `react-native-safe-area-context`
- `react-native-screens`
- `expo-linear-gradient`
- `@expo/vector-icons`
- `react-native-paper`

## Resumo dos Arquivos Principais

- `App.js` — ponto de entrada e configuração de rotas.
- `index.js` — registro do app Expo.
- `context/TrainingContext.js` — estado global e lógica de CRUD.
- `screens/LoginScreen.js` — autenticação de usuários.
- `screens/HomeScreen.js` — dashboard principal.
- `screens/AgendaScreen.js` — agenda de treinamentos com busca e lista de espera.
- `screens/CadastroScreen.js` — cadastro de treinamentos.
- `screens/GestaoScreen.js` — gestão, presenças, aprovações e convites.
- `screens/UsuariosScreen.js` — CRUD e gestão de perfis de acesso.
- `screens/InstrutoresScreen.js` — CRUD de instrutores.
- `screens/CertificadoScreen.js` — certificados.
- `screens/AvaliacaoScreen.js` — avaliações.
- `screens/NotificacoesScreen.js` — central de notificações.
- `screens/RelatoriosScreen.js` — relatórios.
- `screens/AdminScreen.js` — painel administrativo.
- `components/Header.js` — cabeçalho reutilizável com título, subtítulo e logout.
- `components/SimpleCalendar.js` — seletor de datas.
- `components/CustomPicker.js` — seleção customizada.
- `screens/Styles/globalStyles.js` — estilos globais.


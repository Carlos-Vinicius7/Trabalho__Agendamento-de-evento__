# Documentação do Projeto AV2

Este documento descreve o propósito de cada `screen`, `context` e `component` do projeto.

## Estrutura Geral

- `App.js`: componente raiz que configura o provedor de contexto (`TrainingProvider`), o gradiente de fundo e a navegação da aplicação.
- `index.js`: ponto de entrada do Expo que registra o componente `App` como raiz da aplicação.

## Context

### `context/TrainingContext.js`
- Define e exporta `TrainingContext` e `TrainingProvider`.
- Armazena estados globais usados em toda a aplicação:
  - `treinamentos`: lista de treinamentos cadastrados.
  - `user`: usuário logado atualmente.
  - `presencas`: registros de presença nos treinamentos.
  - `avaliacoes`: avaliações enviadas pelos usuários.
  - `notificacoes`: mensagens de aviso exibidas na tela de notificações.
  - `usuarios`: lista de usuários que podem se autenticar.
  - `instrutores`: lista de instrutores cadastrados.
- Define funções de manipulação de dados:
  - `addInstrutor`, `updateInstrutor`, `deleteInstrutor`: CRUD de instrutores.
  - `addUsuario`: registra um novo usuário no sistema.
  - `addTraining`, `updateTraining`, `deleteTraining`: CRUD de treinamentos.
  - `inscreverTreinamento`: inscreve um usuário em um treinamento.
  - `podeGerarCertificado`: verifica se um usuário pode gerar um certificado com base na presença.
- Fornece dados mock para tipos de treinamento.

## Screens

### `screens/HomeScreen.js`
- Tela inicial de boas-vindas.
- Mostra o nome do usuário logado e um resumo do número total de treinamentos.
- Exibe o papel do usuário (`role`).
- Permite navegar para a tela de `Agenda`.

### `screens/AgendaScreen.js`
- Exibe a lista de treinamentos disponíveis.
- Permite alternar entre todos os treinamentos e apenas as inscrições do usuário.
- Cada item mostra informações do evento e permite inscrição.
- Se já inscrito, mostra um status de confirmação.
- Possui link para abrir material de treinamento quando disponível.

### `screens/CadastroScreen.js`
- Tela usada para cadastrar um novo treinamento.
- Inclui campos para descrição, período, capacidade, local, observação, tipo de treinamento e instrutor.
- Usa `SimpleCalendar` para seleção de período e `CustomPicker` para escolher tipo e instrutor.
- Valida campos obrigatórios antes de salvar.

### `screens/CertificadoScreen.js`
- Lista todos os treinamentos para os quais o usuário pode gerar certificado.
- Verifica se o usuário tem presença registrada antes de liberar a geração.
- Permite editar o nome que será impresso no certificado.
- Simula o processo de geração/baixar certificado exibindo um alerta.

### `screens/LoginScreen.js`
- Tela de autenticação e registro.
- Permite login de usuários existentes ou criação de nova conta.
- Salva o usuário no contexto quando autenticado.
- Navega para a tela principal após login ou registro.

### `screens/AvaliacaoScreen.js`
- Tela para enviar avaliação de um treinamento específico.
- Recebe `treinamento_id` via rota.
- Captura nota e comentário.
- Salva a avaliação no contexto e retorna para a tela anterior.

### `screens/GestaoScreen.js`
- Tela de gestão de treinamentos e presenças.
- Lista todos os treinamentos cadastrados.
- Permite marcar presença para o usuário logado.
- Permite enviar notificações no contexto.
- Permite editar ou excluir eventos.
- Usa `SimpleCalendar` para selecionar período ao editar um evento.
- Usa `CustomPicker` para alterar tipo de treinamento e instrutor.

### `screens/InstrutoresScreen.js`
- Tela para gerenciar instrutores.
- Permite adicionar novo instrutor com nome, email e especialidade.
- Exibe lista de instrutores existentes.
- Permite editar dados de um instrutor e excluir instrutores.

### `screens/NotificacoesScreen.js`
- Tela que exibe todas as notificações salvas no contexto.
- Mostra cada aviso em um cartão simples.

### `screens/RelatoriosScreen.js`
- Tela de relatórios e indicadores.
- Calcula total de treinamentos cadastrados.
- Calcula média de notas das avaliações.
- Exibe o total de avaliações recebidas.

## Components

### `components/AssetExample.js`
- Componente de exemplo para demonstrar a importação de imagens locais.
- Usa `Image` para exibir um recurso estático.
- Não é parte central do fluxo de treinamentos.

### `components/CustomPicker.js`
- Componente customizado de seleção de item.
- Recebe lista de `items`, `selectedValue`, `onValueChange` e `placeholder`.
- Exibe um botão que abre uma lista em `FlatList`.
- Permite selecionar um item e fechar o modal.

### `components/SimpleCalendar.js`
- Componente de calendário simples para seleção de intervalos de datas.
- Exibe o mês atual e permite avançar/retroceder mês e ano.
- Permite selecionar data de início e data de fim.
- Destaque os dias selecionados e intervalos.
- Chama `onConfirm` com as datas formatadas e `onClose` para fechar.

## Styles

### `screens/Styles/globalStyles.js`
- Define estilos reutilizáveis para o app.
- Inclui estilos para:
  - contêiner principal (`container`)
  - títulos (`title`)
  - campos de entrada (`input`)
  - cartões de conteúdo (`card`)
  - botões (`button`, `buttonText`)

## Observações

- A navegação principal é montada em `App.js` usando `react-navigation`.
- `TrainingProvider` envolve a aplicação para fornecer dados de estado a todas as telas.
- Algumas telas e componentes são focados em fluxo de cadastro/gestão, enquanto outras servem apenas para visualização.

## Sumário Rápido

Lista curta com links para os arquivos principais do projeto:

- `App.js`: [App.js](App.js) — Componente raiz que configura navegação e provedor de contexto.
- `index.js`: [index.js](index.js) — Ponto de entrada Expo que registra o componente raiz.
- `context/TrainingContext.js`: [context/TrainingContext.js](context/TrainingContext.js) — Contexto global: estados e funções de CRUD.
- `screens/HomeScreen.js`: [screens/HomeScreen.js](screens/HomeScreen.js) — Tela inicial; mostra resumo e navegação rápida.
- `screens/AgendaScreen.js`: [screens/AgendaScreen.js](screens/AgendaScreen.js) — Lista de treinamentos e inscrições.
- `screens/CadastroScreen.js`: [screens/CadastroScreen.js](screens/CadastroScreen.js) — Formulário para criar treinamentos.
- `screens/GestaoScreen.js`: [screens/GestaoScreen.js](screens/GestaoScreen.js) — Gestão de presenças, edição e notificações.
- `screens/CertificadoScreen.js`: [screens/CertificadoScreen.js](screens/CertificadoScreen.js) — Gerar/baixar certificados (simulado).
- `screens/InstrutoresScreen.js`: [screens/InstrutoresScreen.js](screens/InstrutoresScreen.js) — CRUD de instrutores.
- `screens/LoginScreen.js`: [screens/LoginScreen.js](screens/LoginScreen.js) — Login e registro de usuários.
- `screens/AvaliacaoScreen.js`: [screens/AvaliacaoScreen.js](screens/AvaliacaoScreen.js) — Envio de avaliações por treinamento.
- `screens/NotificacoesScreen.js`: [screens/NotificacoesScreen.js](screens/NotificacoesScreen.js) — Exibe notificações do sistema.
- `screens/RelatoriosScreen.js`: [screens/RelatoriosScreen.js](screens/RelatoriosScreen.js) — Indicadores e métricas básicas.
- `screens/AdminScreen.js`: [screens/AdminScreen.js](screens/AdminScreen.js) — Painel administrativo (exemplo).
- `components/SimpleCalendar.js`: [components/SimpleCalendar.js](components/SimpleCalendar.js) — Seletor de intervalo de datas.
- `components/CustomPicker.js`: [components/CustomPicker.js](components/CustomPicker.js) — Picker customizado para listas.
- `components/AssetExample.js`: [components/AssetExample.js](components/AssetExample.js) — Exemplo de asset local.
- `screens/Styles/globalStyles.js`: [screens/Styles/globalStyles.js](screens/Styles/globalStyles.js) — Estilos globais reutilizados.


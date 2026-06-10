# 🎓 Gestão de Treinamentos
React Native + Expo + React Navigation + Context API

<img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />

Aplicativo móvel para gestão de treinamentos corporativos, com controle de inscrições, presença, certificados, instrutores e notificações.

## 📋 Sobre o Projeto

O projeto oferece um sistema de gestão de treinamentos com funcionalidades para:

- visualizar e filtrar a agenda de treinamentos;
- inscrever usuários em eventos;
- gerenciar instrutores e cadastros de treinamentos;
- registrar presença e gerar certificados;
- enviar notificações internas;
- exibir relatórios básicos de avaliações.

O fluxo principal começa na tela de `Login`, que controla o acesso ao conjunto de abas principais através do contexto global.

## ✨ Funcionalidades

- 🗓️ **Agenda de Treinamentos:** Visualização completa da agenda e possibilidade de inscrição nos cursos disponíveis com um clique.
- 👥 **Gestão de Usuários e Instrutores:** Telas dedicadas para o cadastro de participantes e organização do quadro de instrutores.
- 🎓 **Certificados:** Emissão e acesso rápido aos certificados de conclusão após o término do treinamento.
- 🔔 **Notificações:** Central de notificações para manter os usuários atualizados sobre novos treinamentos e avisos importantes.
- 🔐 **Controle de Acesso:** Renderização condicional de abas e recursos dependendo do nível de acesso do usuário (Administrador, Organizador, etc.).
- 🎨 **Design Moderno:** Interface estilizada com gradientes e navegação em abas para melhor experiência mobile.

## 🛠️ Tecnologias Utilizadas

- **React Native:** Framework principal para o desenvolvimento do aplicativo móvel multiplataforma.
- **Expo:** Plataforma e conjunto de ferramentas para facilitar a construção, deploy e testes no ecossistema React Native.
- **React Navigation:** Biblioteca responsável pelo roteamento (Stack e Bottom Tabs) e navegação fluida entre telas.
- **Context API:** Gerenciamento de estado global da aplicação (dados do usuário, treinamentos inscritos, etc.).
- **Expo Vector Icons:** Conjunto de ícones padronizados (Ionicons).

## 🏗️ Estrutura do Projeto
```
GestãoDeTreinamentos/                  # Raiz do repositório
├── 📁 assets/                         # Recursos estáticos (imagens, fontes)
├── 📁 components/                     # Componentes reutilizáveis
│   ├── 📄 AssetExample.js             # Exemplo de componente padrão
│   ├── 📄 CustomPicker.js             # Componente de seleção customizado
│   ├── 📄 SimpleCalendar.js           # Componente de calendário simples
│   └── 📄 Header.js                   # Componente para cabeçalho
├── 📁 context/                        # Context API e estados globais
│   └── 📄 TrainingContext.js          # Lógica de estado principal
├── 📁 screens/                        # Telas do aplicativo
│   ├── 📁 Styles/                     # Estilos gerais
│   │   └── 📄 globalStyles.js         # Estilos globais do app
│   ├── 📄 AgendaScreen.js             # Tela de agenda/inscrições
│   ├── 📄 AvaliacaoScreen.js          # Tela de avaliações
│   ├── 📄 CadastroScreen.js           # Tela de cadastro de usuários
│   ├── 📄 CertificadoScreen.js        # Tela de certificados
│   ├── 📄 GestaoScreen.js             # Gestão geral
│   ├── 📄 HomeScreen.js               # Tela principal (Dashboard)
│   ├── 📄 InstrutoresScreen.js        # Gestão de instrutores
│   ├── 📄 LoginScreen.js              # Tela de autenticação
│   └── 📄 NotificacoesScreen.js       # Central de notificações
├── 📄 App.js                          # Ponto de entrada e rotas principais
├── 📄 app.json                        # Configurações do Expo
└── 📄 package.json                    # Dependências do projeto
```

## 💻 Como Usar

1. 📱 Clone o repositório para sua máquina local.
2. 📦 Execute `npm install` ou `yarn install` para instalar as dependências.
3. 🚀 Inicie o servidor do Expo rodando `npx expo start`.
4. 📲 Utilize o aplicativo Expo Go no seu celular (iOS ou Android) e escaneie o QR Code exibido no terminal.
5. 🔐 Realize o login/cadastro no aplicativo.
6. 📅 Navegue pelas abas, como "Agenda", para ver os treinamentos e realizar sua inscrição.
7. 👤 Administradores podem acessar a aba "Cadastro" e "Instrutores" para gerenciar o app.

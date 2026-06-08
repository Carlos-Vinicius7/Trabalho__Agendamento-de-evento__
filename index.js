import { registerRootComponent } from 'expo';
import App from './App';

// Este arquivo inicia a aplicação Expo e registra o componente raiz App.
// O registerRootComponent garante que o App seja inicializado corretamente
// tanto no Expo Go quanto em builds nativas.
registerRootComponent(App);

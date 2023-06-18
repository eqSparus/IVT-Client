import { createApp } from 'vue';
import '@/assets/scss/normalize.scss';
import '@/assets/scss/main.scss';
import store from '@/plugins/store/Store';
import router from '@/plugins/router/Router';
import App from './App.vue';
import 'vue-advanced-cropper/dist/theme.classic.css';

const app = createApp(App)
  .use(router)
  .use(store);

app.mount('#app');

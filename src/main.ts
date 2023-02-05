import { createApp } from 'vue';
import router from '@/plugins/router/router';
import '@/assets/scss/normalize.scss';
import '@/assets/scss/main.scss';
import App from './App.vue';

const app = createApp(App)
  .use(router);

app.mount('#app');

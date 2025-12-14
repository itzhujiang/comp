import { createApp } from 'vue';
import 'ant-design-vue/dist/reset.css';

import './style.css';
import App from './App.vue';

import { LoadingPlugin } from '@/directives/loadingDirective';

const app = createApp(App);
app.use(LoadingPlugin);
app.mount('#app');

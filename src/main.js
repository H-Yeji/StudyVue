// main.js는 vue 애플리케이션의 시작점 
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js' // router import (라우터 쓰겠다)
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css'

// createApp(App).mount('#app')
const app = createApp(App);

app.use(router)
app.use(vuetify)
app.mount('#app');

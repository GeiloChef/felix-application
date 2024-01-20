import './assets/main.css';
import 'primevue/resources/themes/lara-dark-blue/theme.css';

import { createPinia } from 'pinia';
import Button from 'primevue/button';
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import { createApp } from 'vue';


import App from './App.vue';
import router from './router';

const app = createApp(App);

// eslint-disable-next-line vue/no-reserved-component-names
app.component('Button', Button);
app.component('InputText', InputText);

app.use(PrimeVue);
app.use(createPinia());
app.use(router);

app.mount('#app');

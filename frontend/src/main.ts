import './assets/main.css';
import 'primevue/resources/themes/lara-dark-blue/theme.css';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createPinia } from 'pinia';
import Button from 'primevue/button';
import PrimeVue from 'primevue/config';
import Image from 'primevue/image';
import InputText from 'primevue/inputtext';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

import { i18n } from '@/i18n/config';

const app = createApp(App);

/* add font awesome icon component */
app.component('font-awesome-icon', FontAwesomeIcon);
// eslint-disable-next-line vue/no-reserved-component-names,vue/multi-word-component-names
app.component('Button', Button);
// eslint-disable-next-line vue/no-reserved-component-names
app.component('Image', Image);
app.component('InputText', InputText);

/* add all icon we need to the font-awesome library */
import '/src/icons/fontAwesomeIconsConfig';

app.use(PrimeVue);
app.use(i18n);
app.use(createPinia());
app.use(router);

app.mount('#app');
